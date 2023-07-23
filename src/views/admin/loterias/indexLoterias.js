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
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}

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
const buildTable = (state) => {
  const table = document.getElementById('table-body')
  const myList = state
  table.innerHTML = ''

  myList.map(element => {
    const row = document.createElement('tr')

    // col1
    let cell = document.createElement('td')
    cell.classList.add("w-4")
    if (element.STAFOR === estados.pendiente) {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-red-lt">
          <h6>${element.LIQFOR}</h6>
        </span>
      </div>`
    } else if (element.STAFOR === estados.asignado) {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-blue-lt">
          <h6>${element.LIQFOR}</h6>
        </span>
      </div>`
    } else if (element.STAFOR === estados.resuelto) {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-green-lt">
          <h6>${element.LIQFOR}</h6>
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
    cell.classList.add("w-5")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.EJEFOR}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col4
    cell = document.createElement('td')
    cell.classList.add("w-6")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.REFFOR}</div>
      </div>
    </div>`
    row.appendChild(cell)
    
    // col5
    cell = document.createElement('td')
    cell.classList.add("w-7")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.NIFCON}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col6
    cell = document.createElement('td')
    cell.classList.add("w-25")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.NOMCON}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col7
    cell = document.createElement('td')
    cell.classList.add("w-15")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.DESTIP.length > 30 ? element.DESTIP.slice(0, 30) + '...' : element.DESTIP}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col8
    cell = document.createElement('td')
    if (element.OBSFOR !== null) {
      cell.innerHTML = `<div class="d-flex py-1 align-items-center">
        <div class="flex-fill">
          <div class="font-weight-medium">${element.OBSFOR.length > 66 ? element.OBSFOR.slice(0, 66) + '...' : element.OBSFOR}</div>
        </div>
      </div>`
    }
    row.appendChild(cell)

    // col9
    cell = document.createElement('td')
    cell.classList.add("w-5")
    if (element.STAFOR === estados.pendiente) {
      cell.innerHTML = `<ul class="dots-menu">
        <li class="nav-item drop-right">
          <a href="#" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
            </svg>
          </a>
          <ul>
            <li class="nav-item">
              <a href="/admin/formularios/edit/${element.IDFORM}" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M6.85 20.575q-.6 0-1.012-.412-.413-.413-.413-1.013V4.85q0-.6.413-1.013.412-.412 1.012-.412h7.825L18.6 7.35v3.4h-.65V7.675h-3.6V4.05h-7.5q-.3 0-.55.25-.25.25-.25.55v14.275q0 .3.25.55.25.25.55.25h4.25v.65Zm-.8-.65V4.05 19.925ZM17.025 14.6l.45.425-3.75 3.75v1.1h1.1l3.775-3.75.45.45-3.95 3.95h-2v-2Zm2.025 1.975L17.025 14.6l1.05-1.05q.225-.2.525-.2.3 0 .475.2l1 1q.2.2.2.487 0 .288-.2.538Z"/></svg>
                </svg>
                Editar
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('idborr').value ='${element.IDFORM}', document.getElementById('msgbor').innerHTML ='<p>Ejercicio ${element.EJEFOR}</p><p>${element.NIFCON} ${element.NOMCON}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z"/>
                </svg>
                Borrar
              </a>
            </li>
          </ul>
        </li>                              
      </ul>`
    } else if (element.STAFOR === estados.resuelto) {
      cell.innerHTML = `<ul class="dots-menu">
        <li class="nav-item drop-right">
          <a href="#" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
            </svg>
          </a>
          <ul>
            <li class="nav-item">
              <a href="/admin/formularios/readonly/${element.IDFORM}" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M6.85 20.575q-.6 0-1.012-.412-.413-.413-.413-1.013V4.85q0-.6.413-1.013.412-.412 1.012-.412h7.825L18.6 7.35v3.4h-.65V7.675h-3.6V4.05h-7.5q-.3 0-.55.25-.25.25-.25.55v14.275q0 .3.25.55.25.25.55.25h4.25v.65Zm-.8-.65V4.05 19.925ZM17.025 14.6l.45.425-3.75 3.75v1.1h1.1l3.775-3.75.45.45-3.95 3.95h-2v-2Zm2.025 1.975L17.025 14.6l1.05-1.05q.225-.2.525-.2.3 0 .475.2l1 1q.2.2.2.487 0 .288-.2.538Z"/></svg>
                </svg>
                Formulario
              </a>
            </li>
            <li class="nav-item">
              <a href="/admin/formularios/referencias/readonly/${element.IDFORM}" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M12.975 13.35h.65v-2.975H16.6v-.65h-2.975V6.75h-.65v2.975H10v.65h2.975ZM8.1 16.7q-.625 0-1.038-.412-.412-.413-.412-1.038V4.85q0-.6.412-1.013.413-.412 1.038-.412h10.4q.6 0 1.013.412.412.413.412 1.013v10.4q0 .625-.412 1.038-.413.412-1.013.412Zm0-.65h10.4q.3 0 .55-.25.25-.25.25-.55V4.85q0-.3-.25-.55-.25-.25-.55-.25H8.1q-.3 0-.55.25-.25.25-.25.55v10.4q0 .3.25.55.25.25.55.25Zm-2.575 3.225q-.625 0-1.037-.413-.413-.412-.413-1.037V6.8h.65v11.025q0 .3.25.55.25.25.55.25H16.55v.65ZM7.3 4.05v12-12Z"/>
                </svg>
                Referencias
              </a>
            </li>
            <li class="nav-item list-divider"></li>
            <li class="nav-item ">
              <a href="/user/formularios/smss/readonly/${element.IDFORM}" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M12.875 10.4V5.1q0-.275.2-.488.2-.212.475-.212h5.3q.275 0 .487.212.213.213.213.488v3.1q0 .25-.213.462-.212.213-.487.213h-4.425Zm.65-2.175H18.9V5.05h-5.375Zm0 0V5.05v3.175Zm4.975 11.2q-2.375 0-4.863-1.287-2.487-1.288-4.524-3.326-2.038-2.037-3.338-4.512-1.3-2.475-1.3-4.85 0-.45.288-.75.287-.3.737-.3h1.925q.45 0 .75.262.3.263.4.688l.45 2q.075.375-.013.7-.087.325-.362.55L6.6 10.475q1.4 2.35 3.1 4.037 1.7 1.688 4.075 3.013l2.05-2.15q.275-.275.525-.35.25-.075.575 0l1.65.325q.45.1.713.412.262.313.262.763v1.85q0 .45-.3.75t-.75.3ZM6.275 9.9l2-1.8q.1-.1.138-.275.037-.175.012-.325L7.95 5.45q-.05-.2-.175-.3-.125-.1-.325-.1H5.475q-.175 0-.262.1-.088.1-.088.25-.025 1 .288 2.162.312 1.163.862 2.338Zm8.1 7.875q1 .525 2.187.763 1.188.237 1.988.237.15 0 .25-.1t.1-.25v-1.95q0-.2-.1-.325t-.3-.175l-1.675-.35q-.15-.05-.263-.012-.112.037-.237.162ZM6.275 9.9Zm8.1 7.875Z"/>
                </svg>
                Mensajes
              </a>
            </li>
          </ul>
        </li>                              
      </ul>`
    } else {
      cell.innerHTML = `<ul class="dots-menu">
        <li class="nav-item drop-right">
          <a href="#" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
            </svg>
          </a>
          <ul>
            <li class="nav-item">
              <a href="/admin/formularios/edit/${element.IDFORM}" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M6.85 20.575q-.6 0-1.012-.412-.413-.413-.413-1.013V4.85q0-.6.413-1.013.412-.412 1.012-.412h7.825L18.6 7.35v3.4h-.65V7.675h-3.6V4.05h-7.5q-.3 0-.55.25-.25.25-.25.55v14.275q0 .3.25.55.25.25.55.25h4.25v.65Zm-.8-.65V4.05 19.925ZM17.025 14.6l.45.425-3.75 3.75v1.1h1.1l3.775-3.75.45.45-3.95 3.95h-2v-2Zm2.025 1.975L17.025 14.6l1.05-1.05q.225-.2.525-.2.3 0 .475.2l1 1q.2.2.2.487 0 .288-.2.538Z"/>
                </svg>
                Editar
              </a>
            </li>
            <li class="nav-item">
            <a href="/admin/formularios/resolver/${element.IDFORM}" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M9.575 17.025 4.9 12.35l.475-.45 4.2 4.2 9.075-9.075.45.45Z"/>
                </svg>
                Resolver
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('iddesa').value ='${element.IDFORM}', document.getElementById('msgdes').innerHTML ='<p>Ejercicio ${element.EJEFOR}</p><p>${element.NIFCON} ${element.NOMCON}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-desasignar">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M12.025 20.175q-2.475-2.45-4.137-4.212-1.663-1.763-2.65-3.088-.988-1.325-1.413-2.363Q3.4 9.475 3.4 8.5q0-2.025 1.4-3.425t3.4-1.4q.9 0 1.75.3t1.525.85L9.8 10.675h3.1l-.75 7.875 3.1-10.25H12.2l1.375-4.125q.5-.25 1.038-.375.537-.125 1.112-.125 2.025 0 3.438 1.4 1.412 1.4 1.412 3.425 0 1-.475 2.075-.475 1.075-1.5 2.437-1.025 1.363-2.65 3.113t-3.925 4.05ZM11.55 18.8l.7-7.5h-3.3l1.8-6.25q-.6-.3-1.238-.525Q8.875 4.3 8.225 4.3q-1.75 0-2.962 1.225Q4.05 6.75 4.05 8.5q0 .825.35 1.712.35.888 1.225 2.075.875 1.188 2.325 2.763 1.45 1.575 3.6 3.75Zm1.15-.175q4.025-4.15 5.625-6.338 1.6-2.187 1.6-3.787 0-1.75-1.225-2.975T15.75 4.3q-.45 0-.862.112-.413.113-.788.238l-1 3.025h2.925Zm3.325-10.95ZM8.95 11.3Z"/></svg>
                Desasignar
              </a>
            </li>
          </ul>
        </li>
      </ul>`
    }
    row.appendChild(cell)

    table.appendChild(row)
  })

  createPages()
}
const createPages = () => {
  let str = "<ul>";

  if (hasPrevs) {
    str += "<li class='page-item previous no'><a href='/admin/formularios?cursor=" + JSON.stringify(cursor) + "&part=" + document.getElementById('buscarFormBox').value + "&dir=prev' class='nav-link'>&#9664 Anterior</a>";
  } else {
    str += "<li><a href='#' class='nav-link disabled'>&#9664 Anterior</a>";
  }

  if (hasNexts) {
    str += "<li class='page-item next no'><a href='/admin/formularios?cursor=" + JSON.stringify(cursor) + "&part=" + document.getElementById('buscarFormBox').value + "&dir=next' class='nav-link'>Siguiente &#9654</a>";
  } else {
    str += "<li><a href='#' class='nav-link disabled'>Siguiente &#9654</a>";
  }
  str += "</ul>";

  document.getElementById('pagination-wrapper').innerHTML = str;
}

// events
const elemBuscar = document.getElementById('buscarFormBox');
elemBuscar.onchange = (event) => {
  setCookie('filtro', event.target.value, .5) // medio dia
}
elemBuscar.value = getCookie('filtro')

// incializacion
const elemDel = document.getElementById('del');
elemDel.setAttribute('action', `/admin/formularios/delete?part=${getCookie('filtro')}`)

const elemAdes = document.getElementById('ades');
elemAdes.setAttribute('href', `/admin/formularios/ades?part=`)

const elemDesag = document.getElementById('desag');
elemDesag.setAttribute('action', `/admin/formularios/desasignar?part=${getCookie('filtro')}`)

const elemRes = document.getElementById('rsltos');
elemRes.setAttribute('href', `/admin/formularios/resueltos?part=${getCookie('filtro')}`)

// tabla
buildTable(orgList)
