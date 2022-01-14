const nameField = document.getElementById("iTEXT");
const cardField = document.getElementById("iPAN");
const m_cardField = document.getElementById("m_iPAN");
const cvcField = document.getElementById("iCVC");
const monthField = document.getElementById("month");
const yearField = document.getElementById("year");
const buttonPayment = document.getElementById("buttonPayment");

const fieldsArray = [nameField, m_cardField, cvcField, monthField, yearField]

let hasError = false;

function checkEmpty() {
    let check = false;
    fieldsArray.forEach(item => {
        if (!item.value || item.classList[0] === "errorColor") {
            check = true;
            return;
        }
    })

    hasError = check;
    return hasError;
}

function checkDate(item) {
    const dateNow = new Date();
    let cardDate = new Date();
    cardDate.setYear(yearField.value);
    cardDate.setMonth(monthField.value - 1);
    if (dateNow.getTime() > cardDate.getTime()) {
        item.classList.add("errorColor");
    } else {
        yearField.classList.remove("errorColor");
        monthField.classList.remove("errorColor");
    }
}

/**
 * Is pressed key a number key
 * @param keyCode
 */
 function isNumber(keyCode) {
    return ( (keyCode > 47 && keyCode < 58) );
}

/**
 * Is pressed number
 * @param event
 */
function checkNumberInput (event) {
    var ctrl = event.ctrlKey;
    var key = event.charCode || event.keyCode;
    if (isNumber(key) || (ctrl && (key == 118 || key == 97 || key == 99 || key == 120))) {
        return true;
    }
    return false;
}

function validate(evt) {
    if (!checkNumberInput(evt)) {
        evt.returnValue = false;
        if(evt.preventDefault) {
            evt.preventDefault();
            return false;
        }
    }
  }

function checkIsCompleted(e) {
    const fieldId = e.target.id;
    const value = e.target.value;

    if (fieldId) {
        if (fieldId === 'm_iPAN' && value) {
            const replacedValue = value.replace(/\D/g, '');
            cardField.value = replacedValue.trim();
            $("#iPAN").trigger("keyup.payment");
            m_cardField.value = replacedValue.replace(/(.{4})/g, '$1 ').trim();
        }

        fieldsArray.forEach(item => {
            if (item.id === fieldId) {
                if (!value) {
                    item.classList.add("errorColor");
                } else {
                    if (fieldId === 'iTEXT' && !/(\s*\w+\s*((\.|'|-)|\s+|$)){2,}/.test(item.value)) {
                        item.classList.add("errorColor");
                    } else if (fieldId === 'm_iPAN' && value.length < 13) {
                        item.classList.add("errorColor");
                    } else if (fieldId === 'iCVC' && value.length < 3) {
                        item.classList.add("errorColor");
                    } else if (fieldId === 'month' || fieldId === 'year') {
                        checkDate(item);
                        item.classList.add("selectColor");
                    } else {
                        item.classList.remove("errorColor");
                    }
                }
            }
        });

    }
    addCardIcon(e);
}

function addCardIcon(e) {
    const fieldId = e.target.id;
    const value = e.target.value;
    let cardNumber = value;
    let cardSrc = '';

    if (fieldId) {
        if (fieldId === 'm_iPAN') {
            if (/^2/.test(cardNumber)) {
                // 'Мир';
                cardSrc = './assets/cards/mir.svg';
            }
            if (/^4/.test(cardNumber)) {
                // 'VISA';
                cardSrc = './assets/cards/visa.svg';
            }
            if (/^9/.test(cardNumber)) {
                // 'Arca';
                cardSrc = './assets/cards/arca.svg';
            }
            if (/^5[1-5]/.test(cardNumber)) {
                // 'MasterCard';
                cardSrc = './assets/cards/master.svg';
            }
            if (/^5[0,6-8]/.test(cardNumber)) {
                // 'Maestro';
                cardSrc = './assets/cards/maestro.svg';
            }
            if (/^3[0,6,8]/.test(cardNumber)) {
                // 'Diners Club';
                cardSrc = './assets/cards/dinersClub.svg';
            }
            if (/^3[1,5]/.test(cardNumber)) {
                // 'JCB International';
                cardSrc = './assets/cards/jcbPay.svg';
            }
            if (/^3[4, 7]/.test(cardNumber)) {
                // 'American Express';
                cardSrc = './assets/cards/amex.svg';
            }
            if (/^6[0]/.test(cardNumber)) {
                // 'Discover';
                cardSrc = './assets/cards/discover.svg';
            }
            if (/^6[2]/.test(cardNumber)) {
                // 'China UnionPay';
                cardSrc = './assets/cards/unionPay.svg';
            }
            if (/^6[3,7]/.test(cardNumber)) {
                // 'Maestro';
                cardSrc = './assets/cards/maestro.svg';
            }

            const cardImg = document.getElementById('cardIcon');
            if (cardSrc) {
                cardImg.src = cardSrc;
                cardImg.style.display = 'block';
            } else {
                cardImg.style.display = 'none';
            }
        }
    }
}