module.exports = app => {

    const typeFilter = new Map([
        [
            'text',
            function ({ text, max = 255, min = 1, error }) {
                if (typeof text !== 'string') return this.push(error);
                if (text.trim().length < min) this.push(error);
                if (text.trim().length > max) this.push(error);
            }
        ],
        [
            'equals',
            function ({ a, b, error }) { a !== b && this.push(error) }
        ],
        [
            'exists',
            function ({ value, result=true, error }) {
                if (!value === result) this.push(error);
            }
        ],
        [
            'email',
            function ({ email, error }) {
                const regex = /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/gi;
                if (!regex.test(email)) this.push(error);
            }
        ]
    ]);

    const validate = (props, ...filters) => {
        const errors = [];
        const getFilters = filters.map(filter => typeFilter.get(filter));
        getFilters.forEach(filter => {
            filter.call(errors, props);
        });

        if (errors.length > 0) {
            throw errors.join('\n');
        }
    };

    return validate;

}