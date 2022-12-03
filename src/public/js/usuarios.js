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

  buildTable(state, estadosUsuario)
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

      buildTable(state, estadosUsuario)
    })
  }
}
const buildTable = (state, estadosUsuario) => {
  const table = document.getElementById('table-body')
  const data = pagination(state.querySet, state.page, state.rows)
  const myList = data.querySet
  table.innerHTML = ''

  myList.map(element => {
    // col1
    const row = document.createElement('tr')
    let cell = document.createElement('td')
    cell.classList.add("w-5")
    if (element.STAUSU === estadosUsuario.activo) {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-green-lt">
          <h6>${element.USERID.slice(0, 5)}</h6>
        </span>
      </div>`
    } else {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-red-lt">
          <h6>${element.USERID.slice(0, 5)}</h6>
        </span>
      </div>`
    }
    row.appendChild(cell)

    // col2
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
        <div class="flex-fill">
          <div class="font-weight-medium">${element.NOMUSU}</div>
        </div>
      </div>
      <div class="text-muted">
        <small class="text-reset">Teléfono: ${element.TELUSU}</small>
    </div>`
    row.appendChild(cell)

    // col3
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.DESOFI}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col4
    cell = document.createElement('td')
    cell.classList.add("w-5")
    cell.innerHTML = `<ul class="dots-menu">
      <li class="nav-item drop-right">
        <a href="#" class="nav-link">
          <i class="bi bi-three-dots-vertical"></i>
        </a>
        <ul>
          <li class="nav-item">
            <a href="/admin/usuarios/edit/${element.IDUSUA}" class="nav-link">
              <i class="bi bi-pencil dropdown-item-icon"></i>Editar usuario
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="{document.getElementById('idusua').value ='${element.IDUSUA}', document.getElementById('delusu').innerHTML ='<p>${element.USERID}</p><p>${element.NOMUSU}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
              <i class="bi bi-trash dropdown-item-icon"></i>Borrar usuario
            </a>
          </li>
        </ul>
      </li>
    </ul>`
    row.appendChild(cell)
    table.appendChild(row)
  })

  pageButtons(data.pages)
}
