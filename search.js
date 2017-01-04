var idSearchForm = $('.invoice-id-search')
var idInput = $('input', idSearchForm)

var formFields = separatedInvoiceFields()

idInput
.attr('required', false)
.hide()
.parent()
.after(formFields.container)

idSearchForm.on('submit', invoiceNumberFormHandler(formFields, idInput))

function separatedInvoiceFields() {
  var dateInput = $('<input class="form-control" type="date" name="invoice-date" required>')
  var date = $('<label>Rechnungs-Datum</label>').append(dateInput)

  var storeIdInput = $('<input class="form-control" type="text" name="store-id" placeholder="B43-A12" pattern="[A-Z]\\d\\d-[A-Z]\\d\\d" title="Filial-ID (X99-X12)" required>')
  var storeId = $('<label>Filial-Nummer</label>').append(storeIdInput)

  var invoiceNumberInput = $('<input class="form-control" type="text" name="invoice-id" placeholder="12345678" pattern="\\d{8}" title="8-stellige Rechnungs-Nummer" required>')
  var invoiceNumber = $('<label>Rechnungs-Nummer</label>').append(invoiceNumberInput)

  var container = $('<div class="container"></div>')

  container
  .append(date)
  .append(storeId)
  .append(invoiceNumber)

  return {
    container: container,
    dateInput: dateInput,
    storeIdInput: storeIdInput,
    invoiceNumberInput: invoiceNumberInput
  }
}

function invoiceNumberFormHandler(fields, idInput) {
  return function(e) {
    e.preventDefault()

    var date = new Date(fields.dateInput.val())
    var day = date.getDate().length > 1 ? date.getDate() : '0' + date.getDate()
    var month = date.getMonth().length > 1 ? date.getMonth() : '0' + date.getMonth()
    var year = date.getFullYear()

    var formattedDate = [day, month, year].join('-')

    var invoiceNumberQuery = [formattedDate, fields.storeIdInput.val(), fields.invoiceNumberInput.val()].join('/')

    idInput.val(invoiceNumberQuery)

    var origin = window.location.origin

    var searchUri = idSearchForm.attr('action')

    var uri = new URL(searchUri, origin)

    uri.search = idSearchForm.serialize()

    window.location = uri.href
  }

}
