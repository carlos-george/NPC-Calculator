import { User } from '../models/User';

export default {
    render(user: User) {

        if (user.isAdmin) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            };
        } else {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
            };
        }

    },
    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}