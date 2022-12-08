export class FilterWidjet {
    constructor(element, filterHandler) {
        if (typeof element == 'string') {
            element = document.querySelector(element);
        }
        this._filterHandler = filterHandler
        this.onFilter = this.onFilter.bind(this);
        this._element = element;
        this._filterForm = this._element.querySelector('.filter-widget-form');
        this._filterText = this._element.querySelector('.filter-text')
        this._filterForm.addEventListener('input', this.onFilter);
    }

    onFilter(e) {
        e.preventDefault();
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        const text = this._filterText.value
        this._timeout = setTimeout(() => this._filterHandler(text), 300)
        // this._filterHandler(text)
    }
}