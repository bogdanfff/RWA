import { FormField } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TeamSelectors from '../../store/teams/teams.selector';
import { TeamsActions } from '../../store/teams/teams.actions';
import { allRoles } from '../../users/models/users.model';
import { of, map, tap } from 'rxjs';

export function getUserSchema(store: Store): FormField[] {
    return [
        {
            name: 'userName',
            label: 'Username',
            type: 'text',
            validators: [Validators.required, Validators.minLength(5)]
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            validators: [Validators.minLength(5)]
        },
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'roleName', label: 'Role', type: 'select', selectValue: 'val', dropDown: of(allRoles) },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            validators: [Validators.email]
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'text',
            validators: [
                Validators.pattern('[0-9]+'),
                Validators.minLength(7),
                Validators.maxLength(15)
            ]
        },
        {
            name: 'teamId',
            label: 'Team',
            type: 'select',
            validators: [Validators.required],
            selectValue: 'id',
            dropDown: store.select(TeamSelectors.selectAllTeams).pipe(
                tap(teams => {
                    if (!teams || teams.length === 0) {
                        store.dispatch(TeamsActions.load());
                    }
                }), map(teams => teams.map(s => ({ id: s.id, val: s.teamName })))
            )
        },
        {
            name: 'active',
            label: 'Active',
            type: 'checkbox'
        }
    ]
}