import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const form = document.querySelector('[data-form]')
const queryParamsContainer = document.querySelector("[data-query-params]")
const requestHeadersContainer = document.querySelector("[data-request-headers]")
const keyValueTemplate = document.querySelector("[data-key-value-template]")

document.querySelector("[data-add-query-param-btn]").addEventListener("click", ()=>{
    queryParamsContainer.append(createKeyValuePair())
})
document.querySelector("[data-add-request-header-btn]").addEventListener("click", ()=>{
    queryParamsContainer.append(createKeyValuePair())
})

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

form.addEventListener('submit', e =>{
    e.preventDefault()

    axios({
        url: document.querySelector('[data-url]').value,
        method: document.querySelector('[data-method]').value,
        params: keyValuePairsToObjects(queryParamsContainer),
        headers:keyValuePairsToObjects(requestHeadersContainer)

    })
})

function createKeyValuePair(){
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector('[data-remove-btn]').addEventListener('click', (e) =>{
        e.target.closet('[data-key-value-pair]').remove()
    })
    return element
}

function keyValuePairsToObjects(container){
    const pairs = container.querySelector('[data-key-value-pair]')
    return [...pairs].reduce((data, pair)=>{
       const key = pair.querySelector('[data-key]').value
       const value = pair.querySelector('[data-value]').value

       if (key === '') return data
       return {...data, [key]: value}
    }, {})
}

//
axios({
    url: document.querySelector("[data-url]").value,
    method: document.querySelector("[data-method]").value,
    params: keyValuePairsToObjects(queryParamsContainer),
    headers: keyValuePairsToObjects(requestHeadersContainer),
    data,
  })
  .catch(e => e)
  .then(response => {
    document
      .querySelector("[data-response-section]")
      .classList.remove("d-none")
    updateResponseDetails(response)
    updateResponseEditor(response.data)
    updateResponseHeaders(response.headers)
    console.log(response)
  })
})

function updateResponseDetails(response) {
    document.querySelector("[data-status]").textContent = response.status
    document.querySelector("[data-time]").textContent = response.customData.time
    document.querySelector("[data-size]").textContent = prettyBytes(
      JSON.stringify(response.data).length +
        JSON.stringify(response.headers).length
    )
  }