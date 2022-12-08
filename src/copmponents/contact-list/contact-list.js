import './contact-list.css';
import data from './contact-list.json';
import { filterBy, containsPhone, containsText } from '../../js/filter';


const filterCb = (search, contact) => {
    return containsPhone(contact.phone_number, search) || containsText(contact.first_name + ' ' + contact.last_name, search)
}

export class ContactList {
    constructor(element) {
        if (typeof element == 'string') {
            element = document.querySelector(element)
        } 
        this._element = element;
        this._users = data;
        this.filter = this.filter.bind(this);
        this.onListItemClick = this.onListItemClick.bind(this);
        this.onHtmlClick = this.onHtmlClick.bind(this);
        this._element.addEventListener('click', this.onListItemClick)
        document.documentElement.addEventListener('click', this.onHtmlClick)
    }

    _clear() {
        for (const child of this._element.children) {
            child.remove()
        }
    }

    _renderItems(items) {
        this._clear()
        items.forEach((user) => {
            const itemHtml = this.renderItem(user)
            this._element.insertAdjacentHTML('beforeend', itemHtml)
        })
    }

    renderItem(contact) {
        return `
        <li class="contact-list-item">
            <div class="contact-main">
                <img src="https://raw.githubusercontent.com/pixelastic/fakeusers/master/pictures/${ contact.picture }" class="contact-list-item-img" alt="">
                <span class="contact-list-item-name">${ contact.first_name }  ${ contact.last_name }</span>
                <span class="contact-list-item-phone">${ contact.phone_number}</span>
                <a href="tel:${ contact.phone_number}" class="contact-list-item-action">Звонок</a>
            </div>
            <div class="contact-list-item-details hidden">Подробная информация о клиенте: ${contact.username}</div>
        </li>
        `;
    }

    renderUsers() {
        this._renderItems(this._users)
        // this.fullHtml = this._users.map((user) => {
        //     const itemItem = this.renderItem(user);
        //     return itemItem;
        // }).join('');
        // this._element.innerHTML = this.fullHtml;
    }

    filter(text) {
        const filterCallback = filterCb.bind(null, text)
        this._renderItems(filterBy(this._users, filterCallback))
    }

    onListItemClick(e) {
        const target = e.target
        if (target.classList.contains('contact-list-item-action')) {
            return;
        }
        e.stopImmediatePropagation();
        const listItem = e.target.closest('.contact-list-item');
        const details = listItem.querySelector('.contact-list-item-details');
        details.classList.toggle('hidden')
    }

    onHtmlClick(e) {
        console.log(e)
    }

}