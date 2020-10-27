import React from "react"
import { EditUser } from "../views/Users/EditUser"
import { mount } from 'enzyme'

import { props } from "./assets/EDIT_USER"

//Helper Function 
const simulateFormikInputOnChange = (wrapper, inputName, newValue) => {
    let node = wrapper.findWhere(n => n.type() === 'input' && n.props().name === inputName)
    node.simulate('change', {
        persist: () => { },
        target: {
            name: inputName,
            value: newValue,
        },
    })
    return wrapper.findWhere(n => n.type() === 'input' && n.props().name === inputName)
}

describe('Edit User', () => {
    let wrapper
    beforeEach(async () => {
        props.editUserUserAccountsLoading = false
        console.error = jest.fn() //to suppress console.error 
        jest.resetAllMocks()
    })
    it('renders <EditUser/>', () => {
        wrapper = mount(<EditUser {...props} />)
        expect(wrapper).toBeDefined()
    })

    it('updates 4 input fields', () => {
        const userWrapper = mount(<EditUser {...props} />)
        const company = simulateFormikInputOnChange(userWrapper, 'company', 'Google')

        expect(company.props().value).toEqual('Google')

        const email = simulateFormikInputOnChange(userWrapper, 'email', 'test@google.com')
        expect(email.props().value).toEqual('test@google.com')

        const firstName = simulateFormikInputOnChange(userWrapper, 'firstName', 'Prashant')
        expect(firstName.props().value).toEqual('Prashant')

        const lastName = simulateFormikInputOnChange(userWrapper, 'lastName', 'Bhushan')
        expect(lastName.props().value).toEqual('Bhushan')

        let role = userWrapper.find('[data-qa="roleId"]').first()
        role.props().value = 2
        expect(role.props().value).toEqual(2)

        let accounts = userWrapper.find('[data-qa="accounts"]').first()
        accounts.props().value = [1423, 1118]
        expect(accounts.props().value).toEqual([1423, 1118])

    })

    it('submits the form with params', () => {
        props.updateUserData = jest.fn()
        props.updateUserAccounts = jest.fn()
        const userWrapper = mount(<EditUser {...props} />)
        simulateFormikInputOnChange(userWrapper, 'company', 'Google')

        simulateFormikInputOnChange(userWrapper, 'email', 'test@google.com')

        simulateFormikInputOnChange(userWrapper, 'firstName', 'Prashant')

        simulateFormikInputOnChange(userWrapper, 'lastName', 'Bhushan')

        let role = userWrapper.find('[data-qa="roleId"]').first()
        role.props().onChange('roleId', 23)

        let formik = userWrapper.find('[data-qa="editUserForm"]')

        let accounts = userWrapper.find('[data-qa="accounts"]').first()
        accounts.props().onChange('accounts', [1423, 1118])

        let saveButton = userWrapper.findWhere(n => n.type() === 'button' && n.text() === 'Save').first()
        saveButton.simulate('click')
        let user = {
            userId: Number(props.match.params.user),
            firstName: 'Prashant',
            lastName: 'Bhushan',
            company: 'Google',
            email: 'test@google.com',
            userType: 'External',
            roleId: 23,
            accounts: [1423, 1118]
        }

        expect(props.updateUserData).toHaveBeenCalledWith(user)
    })

})
