import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const queryParamsContainer = document.querySelector('[data-query-params]')
const requestHeadersContainer = document.querySelector('[data-request-headers]')
const keyValueTemplate = document.querySelector("[data-value-template]")

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

function createKeyValuePair(){
    const element = keyValueTemplate.textContent.cloneNode(true)
    element.querySelector('[data-remove-btn]').addEventListener('click', (e) =>{
        e.target.closet('[data-key-value-pair]')
    })
}