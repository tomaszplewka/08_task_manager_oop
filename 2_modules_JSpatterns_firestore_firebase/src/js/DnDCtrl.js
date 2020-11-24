// DragAndDrop Controller
const DnDCtrl = (function() {
	let dragSrcEl = null;
	// 
	const handleDragStart = function(e) {
		if (e.target.classList.contains('list-group-item')) {
			e.target.style.opacity = '0.1';
			dragSrcEl = e.target;
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/html', e.target.innerHTML);
		}
	}

	const handleDragOver = function(e) {
		if (e.target.classList.contains('list-group-item')) {
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.dataTransfer.dropEffect = 'move';
			return false;
		}
	}

	const handleDragEnter = function(e) {
		if (e.target.classList != undefined && e.target.classList.contains('list-group-item')) {
			e.target.classList.add('over');
		}
	}

	const handleDragLeave = function(e) {
		if (e.target.classList != undefined && e.target.classList.contains('list-group-item')) {
			e.target.classList.remove('over');
		}
	}

	const handleDrop = function(e) {
		if (e.target.classList.contains('list-group-item')) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (dragSrcEl != e.target) {
				dragSrcEl.innerHTML = e.target.innerHTML;
				e.target.innerHTML = e.dataTransfer.getData('text/html');
			}
			return false;
		}
	}

	// const handleDragEnd = function(user) {
	const handleDragEnd = function() {
		let taskList = [];
		console.log('drag end');
		//
		[].forEach.call(document.querySelectorAll('.tasks li'), (li) => {
			li.classList.remove('over');
			li.style.opacity = '1';
			// taskList.push(li.textContent);
		});
		//
		// if (scheduledTasks.classList.contains('active')) {
		// 	user.tasks[dateFormat(currToday, 'MMM-D-YYYY')] = taskList;
		// } else if (completedTasks.classList.contains('active')) {
		// 	user.completedTasks[dateFormat(currToday, 'MMM-D-YYYY')] = taskList;
		// }
		// // update in firestore
		// Store.setUser(user);
		//
	};

	const enableDnD = function(li) {
		li.draggable = true;
		li.addEventListener('dragstart', handleDragStart, false);
		li.addEventListener('dragenter', handleDragEnter, false);
		li.addEventListener('dragover', handleDragOver, false);
		li.addEventListener('dragleave', handleDragLeave, false);
		li.addEventListener('drop', handleDrop, false);
		li.addEventListener(
			'dragend',
			() => {
				// handleDragEnd(user);
				handleDragEnd();
			},
			false
		);
	}

	return {
		enableDnD
	}
})();

export default DnDCtrl;