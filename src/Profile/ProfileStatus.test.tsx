import React from 'react';
import {create} from 'react-test-renderer';
import {ProfileStatus} from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('status from props should be in the state)', () => {
        const component = create(<ProfileStatus status={'it-kamasutra'}
                                                updateUserStatus={()=> {}}
        />);
        const instance = component.getInstance();
        expect(instance?.instance.state.status).toBe('it-kamasutra');
    });


    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status={'it-kamasutra'}
                                                updateUserStatus={(status => status)}
        />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test('after creation input shouldnt displayed', () => {
        const component = create(<ProfileStatus status={'it-kamasutra'}
                                                updateUserStatus={()=> {}}
        />);
        const root = component.root;
        expect(()=> {
            let input = root.findByType('input');
        }).toThrow();
    })

        test('input should be displayed in editMode instead of span )', () => {
            const component = create(<ProfileStatus status={'it-kamasutra'}
                                                    updateUserStatus={()=> {}}
            />);
            const root = component.root;
            let span = root.findByType('span');
            span.props.onDoubleClick()
            let input = root.findByType('input')
            expect(input.props.value).toBe('it-kamasutra');

        });

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'it-kamasutra'}
                                                updateUserStatus={mockCallback}
        />);
        const instance = component.getInstance();
        instance?.instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
    })