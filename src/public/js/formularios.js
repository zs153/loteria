// inicializa sort
document.querySelectorAll(".sortable th").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

// funcs
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
const arrayFilter = (value) => {
  const filtro = value.toUpperCase()
  const trimmedData = orgList.filter(itm => Object.keys(itm).some(k => JSON.stringify(itm[k]).includes(filtro)))
  state.querySet = trimmedData
  state.page = 1

  buildTable(state, estadosDocumento)
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
    maxLeft = pages - state.window

    if (maxLeft < 1) {
      maxLeft = 1
    }
    maxRight = pages
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<li value=${page} class="page-item btn">${page}</li>`
  }

  wrapper.innerHTML = `<ul class="pagination "><li value=${1} class="page-item btn">&#171; Primero</li>` + wrapper.innerHTML + `<li value=${pages} class="page-item btn">Último &#187;</li></ul>`

  const elem = document.getElementsByClassName('page-item')
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener('click', (e) => {
      state.page = Number(e.target.value)

      buildTable(state, estadosDocumento)
    })
  }
}
const buildTable = (state, estadosDocumento) => {
  const table = document.getElementById('table-body')
  const data = pagination(state.querySet, state.page, state.rows)
  const myList = data.querySet
  table.innerHTML = ''

  myList.map(element => {
    // col1
    const row = document.createElement('tr')
    let cell = document.createElement('td')
    cell.classList.add("w-4")
    if (element.STADOC === estadosDocumento.pendiente) {
      cell.innerHTML = `<div class="align-items-center py-1">
            <span class="avatar avatar-rounded bg-red-lt">
              <h6>${element.LIQDOC}</h6>
            </span>
          </div>`
    } else if (element.STADOC === estadosDocumento.asignado) {
      if (element.NUMHIT === 0 && element.NUMEVE === 0) {
        cell.innerHTML = `<div class="align-items-center py-1">
              <span class="avatar avatar-rounded bg-blue-lt">
                <h6>${element.LIQDOC}</h6>
              </span>
            </div>`
      } else {
        cell.innerHTML = `<ul class="dots-menu">
            <li class="nav-item drop-left p-0">
              <div class="align-items-center py-1">
                <span class="avatar avatar-rounded bg-yellow-lt">
                  <h6>${element.LIQDOC}</h6>
                </span>
              </div>
            </li>
          </ul>`
      }
    } else if (element.STADOC === estadosDocumento.resuelto) {
      cell.innerHTML = `<div class="align-items-center py-1">
            <span class="avatar avatar-rounded bg-green-lt">
              <h6>${element.LIQDOC}</h6>
            </span>
          </div>`
    }
    row.appendChild(cell)

    // col2
    cell = document.createElement('td')
    cell.classList.add("w-8")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
          <div class="flex-fill">
            <div class="font-weight-medium">${element.DESOFI}</div>
          </div>
        </div>`
    row.appendChild(cell)

    // col3
    cell = document.createElement('td')
    cell.classList.add("w-6")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
          <div class="flex-fill">
            <div class="font-weight-medium">${element.STRFEC}</div>
          </div>
        </div>`
    row.appendChild(cell)

    // col4
    cell = document.createElement('td')
    cell.classList.add("w-5")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
          <div class="flex-fill">
            <div class="font-weight-medium">${element.EJEDOC}</div>
          </div>
        </div>`
    row.appendChild(cell)

    // col5
    cell = document.createElement('td')
    cell.classList.add("w-8")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
          <div class="flex-fill">
            <div class="font-weight-medium">${element.NIFCON}</div>
          </div>
        </div>`
    row.appendChild(cell)

    // col6
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
          <div class="flex-fill">
            <div class="font-weight-medium">${element.NOMCON}</div>
          </div>
        </div>`
    row.appendChild(cell)

    // col7
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
          <div class="flex-fill">
            <div class="font-weight-medium">${element.DESTIP.length > 30 ? element.DESTIP.slice(0, 30) + '...' : element.DESTIP}</div>
          </div>
        </div>`
    row.appendChild(cell)

    // col8
    cell = document.createElement('td')
    if (element.OBSDOC !== null) {
      cell.innerHTML = `<div class="d-flex py-1 align-items-center">
            <div class="flex-fill">
              <div class="font-weight-medium">${element.OBSDOC.length > 30 ? element.OBSDOC.slice(0, 30) + '...' : element.OBSDOC}</div>
            </div>
          </div>`
    }
    row.appendChild(cell)

    // col9
    cell = document.createElement('td')
    cell.classList.add("w-5")
    if (element.STADOC === estadosDocumento.pendiente) {
      cell.innerHTML = `<ul class="dots-menu">
        <li class="nav-item drop-right">
          <a href="#" class="nav-link">
            <i class="bi bi-three-dots-vertical"></i>
          </a>
          <ul>
            <li class="nav-item">
              <a href="/admin/formularios/edit/${element.IDDOCU}" class="nav-link">
                <i class="bi bi-pencil dropdown-item-icon"></i>Editar formulario
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('idasig').value ='${element.IDDOCU}', document.getElementById('msgasi').innerHTML ='<p>${element.REFDOC}</p><p>${element.NIFCON}</p><p>${element.NOMCON}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-asignar">
                <i class="bi bi-heart dropdown-item-icon"></i>Asignar formulario
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('idborr').value ='${element.IDDOCU}', document.getElementById('msgbor').innerHTML ='<p>${element.REFDOC}</p><p>${element.NIFCON}</p><p>${element.NOMCON}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
                <i class="bi bi-trash dropdown-item-icon"></i>Borrar formulario
              </a>
            </li>
          </ul>
        </li>                              
      </ul>`
    } else if (element.STADOC === estadosDocumento.resuelto) {
      cell.innerHTML = `<ul class="dots-menu">
        <li class="nav-item drop-right">
          <a href="#" class="nav-link">
            <i class="bi bi-three-dots-vertical"></i>
          </a>
          <ul>
            <li class="nav-item ">
              <a href="/admin/formularios/edit/${element.IDDOCU}" class="nav-link">
                <i class="bi bi-pencil dropdown-item-icon"></i>Editar
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('iddesa').value ='${element.IDDOCU}', document.getElementById('msgdes').innerHTML ='<p>${element.REFDOC}</p><p>${element.NIFCON}</p><p>${element.NOMCON}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-desasignar">
                <i class="bi bi-reply dropdown-item-icon"></i>Desasignar
              </a>
            </li>
          </ul>
        </li>                              
      </ul>`
    } else {
      cell.innerHTML = `<ul class="dots-menu">
        <li class="nav-item drop-right">
          <a href="#" class="nav-link">
            <i class="bi bi-three-dots-vertical"></i>
          </a>
          <ul>
            <li class="nav-item">
              <a href="/admin/formularios/edit/${element.IDDOCU}" class="nav-link">
                <i class="bi bi-pencil dropdown-item-icon"></i>Editar
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('idreso').value ='${element.IDDOCU}', document.getElementById('msgres').innerHTML ='<p>${element.REFDOC}</p><p>${element.NIFCON}</p><p>${element.NOMCON}</p>', document.getElementById('movres').value = '${element.MOVCON}'}" data-bs-toggle="modal" data-bs-target="#modal-resolver">
                <i class="bi bi-check2 dropdown-item-icon"></i>Resolver
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('iddesa').value ='${element.IDDOCU}', document.getElementById('msgdes').innerHTML ='<p>${element.REFDOC}</p><p>${element.NIFCON}</p><p>${element.NOMCON}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-desasignar">
                <i class="bi bi-x-square dropdown-item-icon"></i>Desasignar
              </a>
            </li>
            <li class="nav-item">
              <a href="/admin/formularios/ejercicio/${element.IDDOCU}" class="nav-link">
                <i class="bi bi-calendar dropdown-item-icon"></i>Ejercicio
              </a>
            </li>
            <li class="nav-item">
              <a href="/admin/formularios/referencias/${element.IDDOCU}" class="nav-link">
                <i class="bi bi-people dropdown-item-icon"></i>Referencias
              </a>
            </li>
            <li class="nav-item list-divider"></li>
            <li class="nav-item ">
              <a href="/admin/formularios/smss/${element.IDDOCU}" class="nav-link">                    
                <i class="bi bi-chat dropdown-item-icon"></i>Gestión sms
              </a>
            </li>
          </ul>
        </li>
      </ul>`
    }
    row.appendChild(cell)

    table.appendChild(row)
  })

  pageButtons(data.pages)
}
