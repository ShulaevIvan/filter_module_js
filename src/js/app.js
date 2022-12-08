import { FilterWidjet } from '../copmponents/filter-widget/filter-widget';
import { ContactList } from '../copmponents/contact-list/contact-list';

const contactList = new ContactList('.contact-list');
const filterWidjet = new FilterWidjet('.filter-widget', contactList.filter);

contactList.renderUsers();