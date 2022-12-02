const focoRes = () => {
  const ele = document.getElementById('texsms')

  ele.focus()
}
const focoSMS = () => {
  const ele = document.getElementById('modsms')

  ele.focus()
}
const getCookie = (key) => {
  let value = ''
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1]
    }
  })
  return value
}
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // document.cookie = name + "=" + (encodeURIComponent(value) || "")  + expires + "; path=/";
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}
const checkItem = (ver) => {
  if (ver === 'n') {
    localStorage.setItem('vertodo', 's')
    window.location.href = 'http://localhost:4000/admin/formularios/vertodo'
  } else {
    localStorage.setItem('vertodo', 'n')
    window.location.href = 'http://localhost:4000/admin/formularios'
  }
}
const validateSms = () => {
  const modsmsValue = modsms.value.trim()
  const movsmsValue = movsms.value.trim()
  const nomsmsValue = nomsms.value.trim()

  if (movsmsValue === '') {
    setError(movsms, 'Movil requerido')
    setTimeout(function () {
      setSuccess(movsms)
    }, 3000)
    return false
  }
  if (nomsmsValue === '') {
    setError(nomsms, 'Nombre requerido')
    setTimeout(function () {
      setSuccess(nomsms)
    }, 3000)
    return false
  }
  if (modsmsValue === '') {
    setError(modsms, 'Texto requerido')
    setTimeout(function () {
      setSuccess(modsms)
    }, 3000)
    return false
  }

  return true
}
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');

  errorDisplay.innerText = message;
  element.classList.add('is-invalid');
  inputControl.classList.remove('is-valid');
}
const sortTableByColumn = (table, column, asc = true) => {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aColText = a.cells[column].textContent;
    const bColText = b.cells[column].textContent;

    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  for (let row of sortedRows) {
    tBody.appendChild(row);
  }

  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}
const arrayFilter = () => {
  const filtro = elemBuscar.value.toUpperCase()
  const trimmedData = orgList.filter(itm => Object.keys(itm).some(k => JSON.stringify(itm[k]).includes(filtro)))

  state.querySet = trimmedData
  state.page = 1

  buildTable()
}
const pagination = (querySet, page, rows) => {
  const trimStart = (page - 1) * rows
  const trimEnd = trimStart + rows
  const trimmedData = querySet.slice(trimStart, trimEnd)
  const pages = Math.ceil(querySet.length / rows);

  return {
    'querySet': trimmedData,
    'pages': pages,
  }
}
const pageButtons = (pages) => {
  let wrapper = document.getElementById('pagination-wrapper')
  let maxLeft = (state.page - Math.floor(state.window / 2))
  let maxRight = (state.page + Math.floor(state.window / 2))

  wrapper.innerHTML = ``
  if (maxLeft < 1) {
    maxLeft = 1
    maxRight = state.window
  }

  if (maxRight > pages) {
    maxLeft = pages - (state.window - 1)

    if (maxLeft < 1) {
      maxLeft = 1
    }
    maxRight = pages
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value=${page} class="page-item btn btn-primary">${page}</button>`
  }
  wrapper.innerHTML = `<button value=${1} class="page-item btn btn-primary">&#171; Primero</button>` + wrapper.innerHTML
  wrapper.innerHTML += `<button value=${pages} class="page-item btn btn-primary">Último &#187;</button>`

  const elem = document.getElementsByClassName('page-item')
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener('click', (e) => {
      state.page = Number(e.target.value)

      buildTable()
    })
  }
}
