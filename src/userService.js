import axios from "axios";

export default class CustomerService {

    // getCustomersSmall() {
    //     return fetch('demo/data/customers-small.json').then(res => res.json())
    //             .then(d => d.data);
    // }

    // getCustomersMedium() {
    //     return fetch('demo/data/customers-medium.json').then(res => res.json())
    //             .then(d => d.data);
    // }

    // getCustomersLarge() {
    //     return fetch('http://localhost:3000/data').then(res => res.json())
    //             .then(d => d.data);
    // }

    getCustomersLarge() {
        return axios.get('http://localhost:3000/data').then((res)=> {
            return res.data
        })
    }

    getAdminList() {
        return axios.get('https://62947bc3a7203b3ed069dbdd.mockapi.io/users').then((res)=> {
            return res.data
        })
    }

    getAdmin(id) {
        return axios.get(`https://62947bc3a7203b3ed069dbdd.mockapi.io/users/${id}`).then((res)=> {
            return res.data
        })
    }

    updateAdmin(data) {
        return axios.put(`https://62947bc3a7203b3ed069dbdd.mockapi.io/users/${data.id}`, {
            username: data.username,
            email: data.email
        }).then((res)=> {
            return res.data
        })
    }

    updatePassword(data) {
        return axios.put(`https://62947bc3a7203b3ed069dbdd.mockapi.io/users/${data.id}`, {
            password: data.password
        }).then((res)=> {
            return res.data
        })
    }

    deleteAdminById(id) {
        return axios.delete(`https://62947bc3a7203b3ed069dbdd.mockapi.io/users/${id}`).then((res)=> {
            return res.status
        })
    }

    // getCustomersXLarge() {
    //     return fetch('demo/data/customers-xlarge.json').then(res => res.json())
    //             .then(d => d.data);
    // }

    getCustomers(params) {
        const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : '';
        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then(res => res.json())
    }
}