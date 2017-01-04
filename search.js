var idSearchForm = $('.invoice-id-search')
var idInput = $('input', idSearchForm)

var dateInput = $('<label>Rechnungs-Datum<input class="form-control" type="date" name="invoice-date" required></label>')
var storeIdInput = $('<label>Filial-Nummer<input class="form-control" type="text" name="store-id" placeholder="B43-A12" required></label>')
var invoiceNumberInput = $('<label>Rechnungs-Nummer<input class="form-control" type="text" name="invoice-id" placeholder="123434" required></label>')

var container = $('<div class="container"></div>')
container
.append(dateInput)
.append(storeIdInput)
.append(invoiceNumberInput)

idInput
.hide()
.parent()
.after(container)
