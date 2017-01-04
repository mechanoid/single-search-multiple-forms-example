var idSearchForm = $('.invoice-id-search')
var idInput = $('input', idSearchForm)

var dateInput = $('<input class="form-control" type="date" name="invoice-date" required>')
var date = $('<label>Rechnungs-Datum</label>').append(dateInput)

var storeIdInput = $('<input class="form-control" type="text" name="store-id" placeholder="B43-A12" required>')
var storeId = $('<label>Filial-Nummer</label>').append(storeIdInput)

var invoiceNumberInput = $('<input class="form-control" type="text" name="invoice-id" placeholder="123434" required>')
var invoiceNumber = $('<label>Rechnungs-Nummer</label>').append(invoiceNumberInput)

var container = $('<div class="container"></div>')
container
.append(date)
.append(storeId)
.append(invoiceNumber)

idInput
.attr('required', false)
.hide()
.parent()
.after(container)

idSearchForm.on('submit', function(e) {
  e.preventDefault()

  var date = new Date(dateInput.val())
  var day = date.getDate().length > 1 ? date.getDate() : '0' + date.getDate()
  var month = date.getMonth().length > 1 ? date.getMonth() : '0' + date.getMonth()
  var year = date.getFullYear()

  var formattedDate = [day, month, year].join('-')

  var invoiceNumberQuery = [formattedDate, storeIdInput.val(), invoiceNumberInput.val()].join('/')

  idInput.val(invoiceNumberQuery)

  var origin = window.location.origin

  var searchUri = idSearchForm.attr('action')

  var uri = new URL(searchUri, origin)

  uri.search = idSearchForm.serialize()

  window.location = uri.href
})
