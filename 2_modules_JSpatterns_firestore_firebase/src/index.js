// Intro to Modules

// import './script_name'

// to import a particular function, variable, etc. from another file put export keyword in front of it in that file and then in index.js
// import { function_name, another_function } from './script'

// you can export things in the same file
// export const contact = 'sdsd';
// or
// export { function, function, variable }

// export default
// export default function
// and import in index.js
// import test from './script'
// import default_export, { regular_function } from './script'
// export { regular_function, default_export as default }

// firebase
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

import './css/style.css';
import UICtrl from './js/UICtrl';
import StoreCtrl from './js/StoreCtrl';
import DataCtrl from './js/DataCtrl';
import UserCtrl from './js/UserCtrl';
import DnDCtrl from './js/DnDCtrl';
import FirebaseCtrl from './js/FirebaseCtrl';

// App Controller
const AppCtrl = (function(UICtrl, UserCtrl, DataCtrl, DnDCtrl, FirebaseCtrl) {
    // Load UI selectors
    const UISelectors = UICtrl.getSelectors();
    // Load event listeners
    const loadEventListeners = function() {
        // UI event listeners
        document.querySelector('body').addEventListener('click', e => {
            // Add user
            if (`#${e.target.id}` === UISelectors.addUserBtn) {
                // Create add user mode
                UICtrl.createAddMode();
                // 
                setTimeout(() => {
                    document.querySelector(UISelectors.loginMainDiv).classList.add('move-y-up');
                    document.querySelector(UISelectors.loginAddMode).classList.add('move-y-zero');
                    // 
                    document.querySelector(UISelectors.username).select();
                    document.querySelector(UISelectors.email).removeAttribute('tabindex');
                    document.querySelector(UISelectors.password).removeAttribute('tabindex');
                }, 100)
                // Validate username, email & password
                Array.from(document.querySelectorAll('input')).forEach(input => input.addEventListener('keyup', e => {
                    DataCtrl.validate(e.target);
                    enableDisableCreateBtn();
                }));
                // Go Back from Add Account Screen
                document.querySelector(UISelectors.addBackBtn).addEventListener('click', () => {
                    document.querySelector(UISelectors.loginMainDiv).classList.remove('move-y-up');
                    document.querySelector(UISelectors.loginAddMode).classList.remove('move-y-zero');
                    setTimeout(() => {
                        document.querySelector(UISelectors.loginAddMode).remove();
                    }, 100)
                    console.log('back');
                })
                // Add new account - submit event
                document.querySelector(UISelectors.addAccountForm).addEventListener('submit', e => {
                    e.preventDefault();
                    // Create user instance
                    const user = UserCtrl.addUser({
                        name: document.querySelector(UISelectors.username).value,
                        email: document.querySelector(UISelectors.email).value,
                        password: document.querySelector(UISelectors.password).value
                    });
                    // Store user in Firebase/Firestore

                    // Create confirm user mode
                    UICtrl.createConfirmMode();
                    document.querySelector(UISelectors.confirmUser).textContent = user.data.name;
                    // 
                    setTimeout(() => {
                        document.querySelector(UISelectors.loginAddMode).classList.remove('move-y-zero'); 
                        document.querySelector(UISelectors.loginAddMode).classList.add('move-y-up');
                        document.querySelector(UISelectors.loginConfirmMode).classList.add('move-y-zero');
                    }, 100)
                    // 
                    setTimeout(() => {
                        // first load user accounts !!!!!!!!!!!!!!!!!!!!

                        // 
                        document.querySelector(UISelectors.loginAddMode).classList.remove('move-y-up');
                        document.querySelector(UISelectors.loginConfirmMode).classList.remove('move-y-zero');
                        document.querySelector(UISelectors.loginMainDiv).classList.remove('move-y-up');
                        // 
                        document.querySelector(UISelectors.loginAddMode).remove();
                        document.querySelector(UISelectors.loginConfirmMode).remove();
                        // render login accounts
                        document.querySelector(UISelectors.loginAccounts).innerHTML = '';
                        UICtrl.renderLoginAccounts(1, [user.data.name], UISelectors.loginAccounts) // change that later
                    }, 2000)
                    

                })
            }
            // Show/Hide password
            if (`.${e.target.className}` === UISelectors.showHidePass) {
                UICtrl.showHidePass(e.target, document.querySelector(UISelectors.password));
            }
            // Remove user
            if (`#${e.target.id}` === UISelectors.removeUserBtn) {
                UICtrl.createRemoveMode();
                // 
                setTimeout(() => {
                    // render list elements
                    UICtrl.renderListElements(UISelectors.loginAccounts, UISelectors.loginRemoveAccounts);
                    // 
                    document.querySelector(UISelectors.loginMainDiv).classList.add('move-y-up');
                    document.querySelector(UISelectors.loginRemoveMode).classList.add('move-y-zero');
                }, 100);
                // Go Back from Remove Account Screen
                document.querySelector(UISelectors.removeBackBtn).addEventListener('click', () => {
                    setTimeout(() => {
                        // render list elements
                        UICtrl.renderListElements(UISelectors.loginRemoveAccounts, UISelectors.loginAccounts);
                        // 
                        document.querySelector(UISelectors.loginMainDiv).classList.remove('move-y-up');
                        document.querySelector(UISelectors.loginRemoveMode).classList.remove('move-y-zero');
                        // 
                        document.querySelector(UISelectors.loginRemoveMode).remove();
                    }, 100);
                });
                // Remove account screen
                document.querySelector(UISelectors.loginRemoveAccounts).addEventListener('click', e => {
                    //
                    
                    //
                });
            }
        });
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

	return {
		init: function() {
            console.log('Initializing App...');

            FirebaseCtrl.firebaseInit();
            
            // Load user accounts

            // If no accounts, disable remove btn
            if (!1) {
                document.querySelector(UISelectors.removeUserBtn).disabled = true;
            } else {
                document.querySelector(UISelectors.removeUserBtn).disabled = false;
            }
            // Render login accounts
            UICtrl.renderLoginAccounts(0, [], UISelectors.loginAccounts) // change that later
            // Load event listeners
            loadEventListeners();
		}
	}

})(UICtrl, UserCtrl, DataCtrl, DnDCtrl, FirebaseCtrl);





// Initialize App
AppCtrl.init();

const button = document.querySelector('.call');
button.addEventListener('click', () => {
// get function reference
  const sayHello = firebase.functions().httpsCallable('sayHello');
  // call the function and pass data
  sayHello({ name: 'Tomoko' }).then(result => {
    console.log(result.data);
  });
});