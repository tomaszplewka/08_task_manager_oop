// UI Controller
import { format, getDate, isToday, subDays } from 'date-fns';
// 
const UICtrl = (function() {
    const UISelectors = {
        addUserBtn: '#login-add-btn',
        loginMainDiv: '.login-main-div',
        loginAddMode: '.login-add-mode',
        username: '#username',
        email: '#email',
        password: '#password',
        showHidePass: '.show-password',
        addBackBtn: '#login-add-back-btn',
        addCreateBtn: '#login-add-create-btn',
        addAccountForm: '#add-account-form',
        loginConfirmMode: '.login-add-confirm-message',
        confirmUser: '#confirm-username',
        loginAccounts: '.login-accounts',
        removeUserBtn: '#login-remove-btn',
        loginRemoveMode: '.login-remove-choose',
        loginRemoveAccounts: '.login-remove-accounts',
        removeBackBtn: '#login-remove-back-btn',
        loginLoader: '#login-loader',
        loginWrapper: '.login-wrapper',
        welcomeHeader: '#welcome-header',
        leadTodayDate: '#lead-today-date',
        mainNavbar: '#main-navbar',
        mainBody: '#main-body',
        logOut: '#log-out',
        monthModeWrapper: '.month-mode-wrapper',
        weekModeWrapper: '.week-mode-wrapper',
        dayModeWrapper: '.day-mode-wrapper',
        lMonthArrow: '#l-month-arrow',
        rMonthArrow: '#r-month-arrow',
        lWeekArrow: '#l-week-arrow',
        rWeekArrow: '#r-week-arrow',
        lDayArrow: '#l-day-arrow',
        rDayArrow: '#r-day-arrow',
        taskTabs: '#task-tabs',
        dayModeContent: '#day-mode-content',
        tableBody: '#table-body',
        tableHead: '#table-head',
        tasks: '.tasks',
        listItem: '.list-group-item',
        logInConfirmBtn: '#login-confirm-login-btn',
        logInConfirmBackBtn: '#login-confirm-back-btn',
        logInConfirmAccount: '.login-confirm-account',
        logInConfirmMode: '.login-confirm',
        logInForm: '#login-form',
        errorPara: '.error',
        addOption: '#add-icon-primary',
        addForm: '.add',
        addFormWrapper: '#add-form-wrapper',
        addFormInputs: '.add input',
        errorTask: '.error-task',
        errorTaskMsg: '.error-task-msg',
        searchTasks: '#search-icon-primary',
        searchForm: '.search-form',
        searchFormWrapper: '#search-form-wrapper',
        leadTaskNum: '#lead-task-number',
        weekModeView: '#week-mode-btn',
        weekModeContent: '#week-mode-content',
        mainOptionsBtns: '#main-options-btn',
        dayModeView: '#day-mode-btn',
        monthModeView: '#month-mode-btn',
        monthModeMonth: '#month-mode-month',
        monthModeYear: '#month-mode-year',
        taskTabsOngoing: '#task-tabs-ongoing',
        taskTabsCompleted: '#task-tabs-completed',
        leadTaskCompletedNum: '#lead-task-completed',
        taskProgress: '#task-progress',
        settings: '#settings',
        settingsWrapper: '#settings-wrapper',
        settingsCloseBtn: '#settings-close-btn',
        themeBtnsWrapper: '#theme-btns-wrapper',
        themeBtns: '.theme',
        avatarBtns: '.avatar',
        toastBtns: '.toast-change',
        avatarBtnsWrapper: '#avatar-btns-wrapper',
        userAvatar: '#user-avatar',
        toastBtnsWrapper: '#toast-btns-wrapper',
        deleteAccountBtn: '#delete-account',
        deleteAccountWrapper: '#delete-account-wrapper',
        deleteAccountCloseBtn: '#delete-account-close-btn',
        deleteAccountBtnsWrapper: '#delete-account-btns-wrapper',
        deleteAccountConfirmBtn: '#delete-account-confirm-btn',
        deleteAccountForm: '#delete-account-form',
        deleteAccountEmail: '#delete-email',
        deleteAccountPassword: '#delete-password',
        deleteAccountErrorPara: '#delete-account-form .error',
        delete: '.delete',
        moreOptionsBtn: '#more-options-btn',
        userNavbar: '#user-btn',
        taskProgress: '#task-progress',
        selectAllOptions: '#select-all-options',
        selectAllBtn: '#select-all-btn',
        markAsBtn: '#mark-as-btn',
        deleteBtn: '#delete-btn',
        deselectBtn: '#deselect-btn',
        pickDate: '#pick-date',
        pickDateFormWrapper: '#pick-date-form-wrapper',
        pickDatePickMode: '#pick-date-pick-mode',
        dateToasts: '.date-toasts',
        pickDateTodayBtn: '#pick-date-today-btn',
        toastMsgWrapper: '#toast-message-wrapper',
        toastCloseBtn: '#toast-close-btn',
        alertMsgWrapper: '#alert-message-wrapper',
        listPastTasks: '.past-tasks',
        alertCloseBtn: '#alert-close-btn',
        notifications: '#notifications',
        navNotifications: '.nav-notifications',
        alertAppendBtn: '#alert-append-btn',
        alertCompleteBtn: '#alert-complete-btn',
        alertDisposeBtn: '#alert-dispose-btn'
    }
    const createHeading = function(cssClass, headingTitle) {
        let heading = document.createElement('h2');
        heading.className = `display-4 text-center ${cssClass}`;
        heading.textContent = headingTitle;
        return heading;
    }
    const createPara = function(spanID, pText) {
        let p = document.createElement('p');
        p.className = 'lead text-center';
        p.innerHTML = `
            Account for user <span id="${spanID}" class="stand-out"></span> has been ${pText}
        `;
        return p;
    }
    const createErrPara = function() {
        let p = document.createElement('p');
        p.className = 'text-center error invalid hide mb-0';
        return p;
    }
    const createUl = function(ulClass) {
        let ul = document.createElement('ul');
        ul.className = `list-group ${ulClass} mx-auto w-100 my-4`;

        return ul;
    }
    const createLi = function(className, liId) {
        let li = document.createElement('li');
		li.className = className;
        li.id = liId !== undefined ? liId : '';
		return li;
    }
    const renderLiAccount = function(liID, liClass = '') {
        let li = createLi(
            `list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 ${liClass}`,
            liID
        );
        li.appendChild(createIcon('fas fa-user show'));
        li.appendChild(createIcon('fas fa-user-times hide'));
        li.appendChild(document.createTextNode(liID));
        li.appendChild(createIcon('fas fa-chevron-right show'));
        li.appendChild(createIcon('fas fa-times hide'));
        return li;
    }
    const createIcon = function(className) {
        const icon = document.createElement('i');
        icon.className = className;
		return icon;
    }
    const createForm = function(formID) {
        let form = document.createElement('form');
        form.className = 'mt-4';
        form.setAttribute('id', formID);
        form.setAttribute('autocomplete', 'off');
        return form;
    }
    const createInputGroup = function(inputClass, iconClass, inputType, inputID, placeholder, prepend = true) {
        let div = document.createElement('div');
        div.className = `input-group form-group mb-0 ${inputClass}`;
        let html = '';
        if (prepend) {
            html = `
            <div class="input-group-prepend">
                <span class="input-group-text" id="">
                    <i class="fas ${iconClass}"></i>
                </span>
            </div>
            <input type="${inputType}" class="validate form-control text-center" id="${inputID}" name="${inputID}"
                placeholder="${placeholder}" ${prepend ? 'tabindex="-1"' : ''}>
            `;
        } else {
            html = `
            <input type="${inputType}" class="validate form-control text-center" id="${inputID}" name="${inputID}"
                placeholder="${placeholder}" ${prepend ? 'tabindex="-1"' : ''}>
            `;
        }
        div.innerHTML = html;
        return div;
    }
    const createShowHidePassword = function(wrapperClass) {
        let div = document.createElement('div');
        div.className = `d-flex justify-content-end align-items-center ${wrapperClass}`;
        div.innerHTML = `
        <i class="far fa-circle mr-1 show-password"></i>
        <i class="far fa-check-circle mr-1 show-password hide"></i>
        <small class="show-password">Show Password</small>
        <small class="show-password hide">Hide Password</small>
        `;
        return div;
    }
    const createBtnGroup = function(...btns) {
        let div = document.createElement('div');
        div.className = 'btn-group d-flex pt-4';
        btns.forEach(btn => div.appendChild(btn));
        return div;
    }
    const createBtn = function(btnID, btnType, btnText, iconClass, left = true) {
        let btn = document.createElement('button');
        btn.className = 'btn btn-outline-light';
        btn.setAttribute('id', btnID);
        btn.setAttribute('type', btnType);
        btn.setAttribute('tabindex', '-1');
        if (left) {
            btn.innerHTML = `
                <i class="fas ${iconClass}"></i>
                <i class="fas ${iconClass} ml-n2 mr-1"></i>
                ${btnText}
            `;
        } else {
            btn.innerHTML = `
                ${btnText}
                <i class="fas ${iconClass} ml-1"></i>
                <i class="fas ${iconClass} ml-n2"></i>
            `;
        }
        return btn;
    }
    const showHidePass = function(target, password) {
        Array.from(target.parentElement.children).forEach((child) => {
			child.classList.toggle('hide');
		});
		password.type === 'password' ? (password.type = 'text') : (password.type = 'password');
    }
    const createAddMode = function() {
        const loginMainDiv = document.querySelector(UISelectors.loginMainDiv);
        // 
        let div = document.createElement('div');
        div.className = `login-add-mode px-4 pt-3 pb-4`;
        div.appendChild(createHeading('welcome-heading', 'Create an Account'));
        div.appendChild(createForm('add-account-form'));
        div.lastElementChild.appendChild(createInputGroup('add-username', 'fa-user-edit', 'text', 'username', 'username'));
        div.lastElementChild.appendChild(createInputGroup('add-email', 'fa-envelope', 'text', 'email', 'email'));
        div.lastElementChild.appendChild(createInputGroup('add-password', 'fa-key', 'password', 'password', 'password'));
        div.lastElementChild.appendChild(createShowHidePassword('create-account-show-password-wrapper'));
        div.lastElementChild.appendChild(createErrPara());
        div.lastElementChild.appendChild(createBtnGroup(createBtn('login-add-back-btn', 'button', 'Go Back', 'fa-chevron-left'), createBtn('login-add-create-btn', 'submit', 'Create', 'fa-chevron-right', false)));
        div.querySelector(UISelectors.addCreateBtn).setAttribute('disabled', true);
        // 
        loginMainDiv.after(div);
    }
    const createConfirmMode = function() {
        const loginAddMode = document.querySelector(UISelectors.loginAddMode);
        // 
        let div = document.createElement('div');
        div.className = `login-add-confirm-message px-4 pt-3 pb-4`;
        div.appendChild(createHeading('welcome-heading', 'Account Created'));
        div.appendChild(createPara('confirm-username', 'created'));
        // 
        loginAddMode.after(div);
    }
    const createLogInMode = function(id) {
        const loginMainDiv = document.querySelector(UISelectors.loginMainDiv);
        // 
        let div = document.createElement('div');
        div.className = `login-confirm px-4 pt-3 pb-4`;
        div.appendChild(createHeading('welcome-heading', 'Log In'));
        div.appendChild(createUl('login-confirm-account')); 
        div.appendChild(createForm('login-form'));
        div.lastElementChild.appendChild(createInputGroup('login-email', 'fa-key', 'text', 'email', 'email', false));
        div.lastElementChild.appendChild(createInputGroup('login-password', 'fa-key', 'password', 'password', 'password', false));
        div.lastElementChild.appendChild(createShowHidePassword('login-show-password-wrapper'));
        div.lastElementChild.appendChild(createErrPara());
        div.lastElementChild.appendChild(createBtnGroup(createBtn('login-confirm-back-btn', 'button', 'Go Back', 'fa-chevron-left'), createBtn('login-confirm-login-btn', 'submit', 'Log In', 'fa-chevron-right', false)));
        // 
        loginMainDiv.after(div);
        // 
        document.querySelector(UISelectors.logInConfirmAccount).appendChild(renderLiAccount(id,  'mb-n4'));
    }
    const createLoginLoader = function() {
        const loginMainDiv = document.querySelector(UISelectors.loginMainDiv);
        // 
        let div = document.createElement('div');
        div.setAttribute('id', 'login-loader');
        div.innerHTML = `
            <div class="loadingio-spinner-double-ring-qvrskz4wwq">
                    <div class="ldio-voeg20dzl7">
                        <div></div>
                        <div></div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
        `;
        // 
        loginMainDiv.after(div);
    }
    const renderLoginAccounts = function(accNum, accArr, listSelector) {
        // Clear ul
        document.querySelector(UISelectors.loginAccounts).innerHTML = '';
        // 
        if (accNum) {
            accArr.forEach((account) => {
                const accountObj = account.data();
                document.querySelector(listSelector).appendChild(renderLiAccount(accountObj.name));
            });
        } else {
            let li = createLi('list-group-item py-2');
            li.appendChild(document.createTextNode(`No accounts in the database`));
            document.querySelector(listSelector).appendChild(li);
            document.querySelector(listSelector).classList.add('empty');
        }
    }
    const setTableBodyHead = function(head = true) {
        let tableHead;
        if (!head) {
            tableHead = 
            `
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
            `;
        } else {
            tableHead = '';
        }
        document.querySelector(UISelectors.tableBody).innerHTML = '';
        document.querySelector(UISelectors.tableHead).innerHTML = tableHead;
    }






    const generateWeekTemplate = function(firstDayCurrWeek, firstDayNextWeek, week, taskList) {
        // Adjust UI display
        document.querySelector(UISelectors.weekModeContent).textContent = `
            ${getDate(firstDayCurrWeek)} ${format(firstDayCurrWeek, 'MMMM yyyy')} - 
            ${getDate(subDays(firstDayNextWeek, 1))} ${format(subDays(firstDayNextWeek, 1), 'MMMM yyyy')}
        `;
        // Create template
        let row = document.createElement('tr');
        console.log('generateWeekTemplate');
        week.forEach(day => {
            let td = document.createElement('td');
            td.innerHTML = `${format(day, "d MMM yyyy")}`;
            if (isToday(day)) {
                td.classList.add('current-day');
                row.classList.add('current-week');
            }
            if (new Date(day.getFullYear(), day.getMonth(), day.getDate()) < subDays(new Date(), 31)) {
                td.classList.add('invalid-day');
                row.classList.add('invalid-week');
			} else { td.classList.add('valid-day'); }
            // Add badge
            if (taskList[format(day, "d'-'MMM'-'yyyy")] !== undefined && taskList[format(day, "d'-'MMM'-'yyyy")].length) {
                td = addBadge(td, taskList[format(day, "d'-'MMM'-'yyyy")].length);
            }
			// Append day
            row.append(td);
        });
        // Append week
		document.querySelector(UISelectors.tableBody).append(row);
		document.querySelector('body').setAttribute('class', 'week-mode-active');
		// Enable/disable left week arrow
		if (row.classList.contains('invalid-week')) {
            document.querySelector(UISelectors.lWeekArrow).disabled = true;
		} else {
			document.querySelector(UISelectors.lWeekArrow).disabled = false;
		}
    }


    









    const renderListElements = function(listStart, listEnd) {
        Array.from(document.querySelector(listStart).children).forEach((li) => {
			Array.from(li.children).forEach((i) => {
				if (i.classList.contains('show')) {
                    i.classList.remove('show');
                    i.classList.add('hide');
				} else {
                    i.classList.remove('hide');
                    i.classList.add('show');
				}
			});
			document.querySelector(listEnd).appendChild(li);
		});
    }


    const renderTableUI = function() {
        setTableBodyHead();
        document.querySelector(UISelectors.tableBody).append(createUl('tasks text-light'));
		// document.querySelector(UISelectors.tableBody).setAttribute('class', 'day-mode');
    }
    

    const displayTasks = function(tasks, currToday, enableDnD, user, setTasks, ongoing = true) {
        currToday = format(currToday, "d'-'MMM'-'yyyy");
        console.log(tasks);
        if (!(tasks === undefined)) {
            if (tasks[currToday] !== undefined ) {
                if (tasks[currToday].length !== 0) {
                    tasks[currToday].forEach((task, index) => {
                        generateDayTemplate(task, index, enableDnD, user, currToday, setTasks, ongoing);
                    });
                    return tasks[currToday].length;
                } else {
                    // no tasks for this date
                    let list = document.querySelector(UISelectors.tasks);
                    let li = createLi('list-group-item d-flex justify-content-center align-items-center');
                    let p = document.createElement('p');
                    p.className = 'lead text-center m-0';
                    p.appendChild(document.createTextNode('No tasks to display'));
                    li.appendChild(p);
                    list.appendChild(li);
                    return 0;
                }
            }
            else {
                // no tasks for this date
                let list = document.querySelector(UISelectors.tasks);
                let li = createLi('list-group-item d-flex justify-content-center align-items-center');
                let p = document.createElement('p');
                p.className = 'lead text-center m-0';
                p.appendChild(document.createTextNode('No tasks to display'));
                li.appendChild(p);
                list.appendChild(li);
                return 0;
            }
        } else {
            // no tasks for this date
            let list = document.querySelector(UISelectors.tasks);
            let li = createLi('list-group-item d-flex justify-content-center align-items-center');
            let p = document.createElement('p');
            p.className = 'lead text-center m-0';
            p.appendChild(document.createTextNode('No tasks to display'));
            li.appendChild(p);
            list.appendChild(li);
            return 0;
        }
    }

    const generateDayTemplate = function(task, index, enableDnD, user, currToday, setTasks, ongoing = true) {
        let list = document.querySelector(UISelectors.tasks);
        let li = createLi('list-group-item d-flex justify-content-between align-items-center task-item', `task${index}`);
        // 
        let divIconComplete = document.createElement('div');
        divIconComplete.className = 'd-flex justify-content-between align-items-center';
        if (ongoing) {
            divIconComplete.appendChild(createIcon('far fa-circle uncompleted'));
            divIconComplete.appendChild(createIcon('far fa-check-circle completed hide'));
        } else {
            divIconComplete.appendChild(createIcon('far fa-circle uncompleted hide'));
            divIconComplete.appendChild(createIcon('far fa-check-circle completed'));
        }
        li.appendChild(divIconComplete);
        // 
        let divText = document.createElement('div');
		divText.className = 'lead';
		divText.appendChild(document.createTextNode(task));
        li.appendChild(divText);
        // 
        let divIcon = document.createElement('div');
        divIcon.className = 'd-flex justify-content-between align-items-center';
        if (ongoing) {
            divIcon.appendChild(createIcon('fas fa-edit mr-1 edit'));
            divIcon.appendChild(createIcon('fas fa-keyboard mr-2 fa-2x ongoing-edit text-danger hide'));
        }
		divIcon.appendChild(createIcon('far fa-trash-alt delete'));
        li.appendChild(divIcon);
        // 
        enableDnD(li, user, currToday, setTasks);
		//
		list.appendChild(li);
    }

    const errorTasks = function(text) {
        document.querySelector(UISelectors.addForm).add.disabled = true;
        document.querySelector(UISelectors.addForm).add.classList.toggle('invalid');
        document.querySelector(UISelectors.errorTaskMsg).innerText = `${text}`;
        document.querySelector(UISelectors.errorTask).classList.toggle('hide');
        setTimeout(() => {
            document.querySelector(UISelectors.addForm).add.disabled = false;
            document.querySelector(UISelectors.errorTask).classList.toggle('hide');
            document.querySelector(UISelectors.addForm).add.classList.toggle('invalid');
        }, 1500);

        return true;
    }











    const setTheme = function(main, secondary, td, currWeekHover, rowHover, currDay, badge, bg, text) {
		const root = document.documentElement;
		root.style.setProperty('--theme1-main-color', main);
		root.style.setProperty('--theme1-secondary-color', secondary);
		root.style.setProperty('--theme1-td-color', td);
		root.style.setProperty('--theme1-currweek-hover-color', currWeekHover);
		root.style.setProperty('--theme1-row-hover-color', rowHover);
		root.style.setProperty('--theme1-currday-color', currDay);
		root.style.setProperty('--theme1-badge-color', badge);
		root.style.setProperty('--theme1-bg-color', bg);
		root.style.setProperty('--theme1-text-color', text);
    }
    const chooseTheme = function(theme) {
		switch (theme) {
			case 'theme-1':
				setTheme('#343a40', '#6c757d', '#454d55', '#dee2e6', '#dee2e6', '#000000', '#007bff', '#000000', '#ffffff');
                document.querySelector('#' + theme).classList.add('theme-active');
                console.log('tu tez powinienem byc');
				break;
			case 'theme-2':
				setTheme('#666a86', '#788aa3', '#ffc800', '#b2c9ab', '#b2c9ab', '#788aa3', '#ff8427', '#92b6b1', '#e8ddb5');
				document.querySelector('#' + theme).classList.add('theme-active');
				break;
			case 'theme-3':
				setTheme('#507dbc', '#a1c6ea', '#bbd1ea', '#ffa62b', '#ffa62b', '#a1c6ea', '#dae3e5', '#be6e46', '#04080f');
				document.querySelector('#' + theme).classList.add('theme-active');
				break;
			case 'theme-4':
				setTheme('#291528', '#9e829c', '#3a3e3b', '#9e829c', '#9e829c', '#93b7be', '#000000', '#93b7be', '#f1fffa');
				document.querySelector('#' + theme).classList.add('theme-active');
				break;
			case 'theme-5':
				setTheme('#f7a9a8', '#ef798a', '#087ca7', '#05b2dc', '#988b8e', '#05b2dc', '#e5c3d1', '#988b8e', '#613f75');
				document.querySelector('#' + theme).classList.add('theme-active');
				break;
			case 'theme-6':
				setTheme('#3d315b', '#444b6e', '#708b75', '#eee5e5', '#9ab87a', '#ddcecd', '#444b6e', '#ddcecd', '#f8f991');
				document.querySelector('#' + theme).classList.add('theme-active');
				break;
		}
    }
    const chooseAvatar = function(avatar) {
		switch (avatar) {
			case 'avatar-1':
                document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-2':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-3':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-4':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-5':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-6':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-7':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-8':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-9':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-10':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-11':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-12':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-13':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
			case 'avatar-14':
				document.querySelector('#' + avatar).classList.add('avatar-active');
				break;
		}
    }
    const chooseToast = function(toast) {
		switch (toast) {
			case 'toast-change-1':
                document.querySelector('#' + toast).classList.add('toast-active');
				break;
			case 'toast-change-2':
				document.querySelector('#' + toast).classList.add('toast-active');
				break;
			case 'toast-change-3':
				document.querySelector('#' + toast).classList.add('toast-active');
				break;
			case 'toast-change-4':
				document.querySelector('#' + toast).classList.add('toast-active');
				break;
		}
    }
    






    const addToast = function(date, selector) {
        document.querySelector(UISelectors.dateToasts).innerHTML += 
        `
            <div class="toast m-0" id="${selector}" role="status" aria-live="polite" aria-atomic="true" data-autohide="false">
                <div class="toast-header p-1 pr-0">
                    <span>${date}</span>
                    <button type="button" class="ml-auto mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span class="x p-0" aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        `;
    }
    const addBadge = function(td, number) {
        let span = document.createElement('span');
        td.classList.add('task-marker-td');
        span.className = 'badge badge-pill task-marker';
        span.textContent = number;
        td.appendChild(span);
        return td
    }













    const enableDisableCreateBtn = function() {
        if (document.querySelector(UISelectors.username).classList.contains('valid') &&
            document.querySelector(UISelectors.email).classList.contains('valid') &&
            document.querySelector(UISelectors.password).classList.contains('valid')) {
            document.querySelector(UISelectors.addCreateBtn).disabled = false;
        } else {
            document.querySelector(UISelectors.addCreateBtn).disabled = true;
        }
    }

    const errorSignUpAll = function(error, errorHandler, data) {
        const { errorMsg, errorUsername, errorEmail, errorPass } = errorHandler(error.code);
        switch (true) {
            case (errorUsername === 1 && errorEmail === 1 && errorPass === 1):
                data.errorPara.innerHTML = errorMsg;
                data.errorPara.classList.remove('hide');
                data.username.classList.add('invalid');
                data.email.classList.add('invalid');
                data.pass.classList.add('invalid');
                data.username.disabled = true;
                data.email.disabled = true;
                data.pass.disabled = true;
                setTimeout(() => {
                    data.errorPara.classList.add('hide');
                    data.username.classList.remove('invalid');
                    data.email.classList.remove('invalid');
                    data.pass.classList.remove('invalid');
                    data.username.classList.remove('valid');
                    data.email.classList.remove('valid');
                    data.pass.classList.remove('valid');
                    data.username.disabled = false;
                    data.email.disabled = false;
                    data.pass.disabled = false;
                }, 3000);
                break;
            case errorEmail === 1:
                data.errorPara.innerHTML = errorMsg;
                data.errorPara.classList.remove('hide');
                data.email.classList.add('invalid');
                data.username.disabled = true;
                data.email.disabled = true;
                data.pass.disabled = true;
                setTimeout(() => {
                    data.errorPara.classList.add('hide');
                    data.username.classList.remove('invalid');
                    data.email.classList.remove('invalid');
                    data.pass.classList.remove('invalid');
                    data.username.classList.remove('valid');
                    data.email.classList.remove('valid');
                    data.pass.classList.remove('valid');
                    data.username.disabled = false;
                    data.email.disabled = false;
                    data.pass.disabled = false;
                }, 3000);
                break;
            case pass === 1:
                data.errorPara.innerHTML = errorMsg;
                data.errorPara.classList.remove('hide');
                data.pass.classList.add('invalid');
                data.username.disabled = true;
                data.email.disabled = true;
                data.pass.disabled = true;
                setTimeout(() => {
                    data.errorPara.classList.add('hide');
                    data.username.classList.remove('invalid');
                    data.email.classList.remove('invalid');
                    data.pass.classList.remove('invalid');
                    data.username.classList.remove('valid');
                    data.email.classList.remove('valid');
                    data.pass.classList.remove('valid');
                    data.username.disabled = false;
                    data.email.disabled = false;
                    data.pass.disabled = false;
                }, 3000);
                break;
        }
    }

    const errorSignUpSingleInput = function(data, msg) {
        let p = document.createElement('p');
        p.className = "text-center invalid mb-0"
        p.textContent = msg;
        data.errorPara.appendChild(p);
        data.errorPara.classList.remove('hide');
        data.username.disabled = true;
        data.email.disabled = true;
        data.pass.disabled = true;
        setTimeout(() => {
            data.errorPara.classList.add('hide');
            data.username.classList.remove('invalid');
            data.email.classList.remove('invalid');
            data.pass.classList.remove('invalid');
            data.username.classList.remove('valid');
            data.email.classList.remove('valid');
            data.pass.classList.remove('valid');
            data.username.disabled = false;
            data.email.disabled = false;
            data.pass.disabled = false;
        }, 5000);
    }

    const errorLogInAll = function(error, errorHandler, data) {
        const { errorMsg, errorEmail, errorPass } = errorHandler(error.code);
        switch (true) {
            case data.email.value === '' && data.pass.value === '':
                data.errorPara.innerHTML = "No email and password provided.";
                data.errorPara.classList.remove('hide');
                data.email.classList.add('invalid');
                data.pass.classList.add('invalid');
                data.email.disabled = true;
                data.pass.disabled = true;
                setTimeout(() => {
                    data.errorPara.classList.add('hide');
                    data.email.classList.remove('invalid');
                    data.pass.classList.remove('invalid');
                    data.email.disabled = false;
                    data.pass.disabled = false;
                }, 3000);
                break;
            case errorEmail === 1 && errorPass === 1:
                data.errorPara.innerHTML = errorMsg;
                data.errorPara.classList.remove('hide');
                data.email.classList.add('invalid');
                data.pass.classList.add('invalid');
                data.email.disabled = true;
                data.pass.disabled = true;
                setTimeout(() => {
                    data.errorPara.classList.add('hide');
                    data.email.classList.remove('invalid');
                    data.pass.classList.remove('invalid');
                    data.email.disabled = false;
                    data.pass.disabled = false;
                }, 3000);
                break;
            case errorEmail === 1:
                data.errorPara.innerHTML = errorMsg;
                data.errorPara.classList.remove('hide');
                data.email.classList.add('invalid');
                data.email.disabled = true;
                data.pass.disabled = true;
                setTimeout(() => {
                    data.errorPara.classList.add('hide');
                    data.email.classList.remove('invalid');
                    data.email.disabled = false;
                    data.pass.disabled = false;
                }, 3000);
                break;
            case errorPass === 1:
                data.errorPara.innerHTML = errorMsg;
                data.errorPara.classList.remove('hide');
                data.pass.classList.add('invalid');
                data.email.disabled = true;
                data.pass.disabled = true;
                setTimeout(() => {
                    data.errorPara.classList.add('hide');
                    data.pass.classList.remove('invalid');
                    data.email.disabled = false;
                    data.pass.disabled = false;
                }, 3000);
                break;
        }
    }

    const createMsg = function(text) {
        const msg = document.createElement('p');
        msg.classList.add('m-0');
        msg.appendChild(document.createTextNode(text));
        return msg;
    }

    return {
        getSelectors: function() {
            return UISelectors;
        },
        createAddMode,
        createConfirmMode,
        createLoginLoader,
        createLogInMode,
        showHidePass,
        renderLoginAccounts,
        renderListElements,
        setTableBodyHead,
        renderTableUI,
        displayTasks,
        errorTasks,
        chooseTheme,
        chooseAvatar,
        chooseToast,
        addToast,
        addBadge,
        enableDisableCreateBtn,
        errorSignUpAll,
        errorSignUpSingleInput,
        errorLogInAll,
        generateWeekTemplate,
        createMsg
    }

})();

export default UICtrl;