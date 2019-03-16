var loginAsRight = "loginAs";
var allUsers = [
	{nickname: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	{nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	{nickname: "patriot007", password: "russiaFTW", groups: ["basic"]}
];
var allRights = ["manage content", "play games", "delete users", "view site"];
var allGroups = {
	"admin": [allRights[2]],
	"manager": [allRights[0]],
	"basic": [allRights[1], allRights[3]]
}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя. 
function createUser(username, pass) {
	let newUser = {nickname: username, password: pass, groups: []};
	allUsers.push(newUser);
	return newUser;
};

//Удаляет пользователя user 
function deleteUser(user) {
	let index = allUsers.indexOf(user);
	if (index > -1) {
		allUsers.splice(index, 1);
	} else {
		throw new Error("error deleteUser");
	}

};

//Возвращает массив всех пользователей. 
function users() {
	return allUsers; 
};

//Создает новую группу и возвращает её
function createGroup() {
	let newGroup = guidGenerator();
	allGroups[newGroup] = [];
	return newGroup;
};

//Удаляет группу group 
function deleteGroup(group) {
	if (group && allGroups[group]){
		for (let i = 0 ; i < allUsers.length ; i++){
			//Ловим исключение из функции на отсутствие группы у пользователя
			try {
				removeUserFromGroup(allUsers[i], group);
			} catch {
			}
		}
		delete allGroups[group];
	} else {
		throw new Error('opa');
	}
};

//Возвращает массив групп 
function groups() {
	return Object.keys(allGroups);
};

//Добавляет пользователя user в группу group 
function addUserToGroup(user, group) {
	let index = allUsers.indexOf(user);	
	if (index > -1 && user && group) { 
		let indexGroup = allUsers[index]["groups"].indexOf(group);
		if (indexGroup === -1) {
			allUsers[index]["groups"].push(group);
		} else {
			//console.log(indexGroup, group, user, allUsers);
			//throw new Error("error: group existing");
		}
	} else {
		throw new Error("error addUserToGroup");
	} 
};

//Возвращает массив групп, к которым принадлежит пользователь user 
function userGroups(user) {
	let index = allUsers.indexOf(user);
	return allUsers[index]["groups"];
};

//Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group 
function removeUserFromGroup(user, group) {
	let index = allUsers.indexOf(user);	 
	if (index > -1) { 
		let indexGroup = allUsers[index]["groups"].indexOf(group);
		if (indexGroup > -1) {
			allUsers[index]["groups"].splice(indexGroup, 1);;
		} else {
			throw new Error("error: group not existing");
		}
	} else {
		throw new Error("error removeUserFromGroup");
	} 
};

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

//Создает новое право и возвращает его 
function createRight(rightName = false) {
	let newRight;
	if (rightName) {
	    newRight = rightName;
	} else {
		newRight = guidGenerator();
	}
	allRights.push(newRight);
	return newRight;
};

//Удаляет право right и каскадно удаляет связь с группой
function deleteRight(right) {
	let index = allRights.indexOf(right);
	if (index > -1) {
		for (let i = 0 ; i < Object.keys(allGroups).length ; i++){
			//Ловим исключение из функции на отсутствие группы у пользователя
			try {
				removeRightFromGroup(right, Object.keys(allGroups)[i]);
			} catch {
			}
		}
		allRights.splice(index, 1);
	} else {
		throw new Error("error deleteRight");
	}
};

//Возвращает массив прав, которые принадлежат группе group
function groupRights(group) {
	return allGroups[group];
};

//Возвращает массив прав
function rights() {
	return allRights; 
};

//Добавляет право right к группе group
function addRightToGroup(right, group) {
	let index = allRights.indexOf(right);	
	// let checkGroup = allGroups[group]; 
	if (index > -1) { 
		let searchedGroup = allGroups[group];
		if (searchedGroup) {
			allGroups[group].push(right);
		} else {
			throw new Error("error: group not existing");
		}
	} else {
		throw new Error("error addRightToGroup");
	} 
};

//Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group 	
function removeRightFromGroup(right, group) {
	let index = allRights.indexOf(right);	
	// let checkGroup = allGroups[group]; 
	//if (index > -1) { 
		let indexRight = allGroups[group].indexOf(right);
		if (indexRight > -1) {
			allGroups[group].splice(indexRight, 1);
		}else {
			throw new Error("error: right not existing");
		
	//} else {
		
		//throw new Error("error removeRightFromGroup: You are so fast 0_o RETRY NOW!!!!!");
	} 
};

//Сессия пользователя
var currentSessionUser = undefined;
//переменная - логин за какого пользователя (за кого зашел админ)
var currentLoginAs = undefined;

//return -	true, если пользователь с логином username и паролем password существует, false в противном случае. 
//Также функция login должна вернуть false в случае, если сессия пользователя уже существует.
function login(username, password) {
	let userFinded = false;
	for (let i = 0; i < allUsers.length; i++){
		if (allUsers[i]['nickname'] == username && allUsers[i]['password'] == password){
			userFinded = allUsers[i];
			break;
		}
	}

	if (userFinded && !currentSessionUser){
		currentSessionUser = userFinded;
		return true;
	} else {
		return false;
	}
};

//return	-	Возвращает текущего пользователя или undefined в случае, если текущий пользователь не прошел аутентифицацию
function currentUser() {
	return (currentLoginAs ? currentLoginAs : currentSessionUser);
};

// Вызов данной функции должен завершать сессию текущего пользователя
function logout() {
	if (currentLoginAs){
		currentLoginAs = undefined;
	} else {
		currentSessionUser = undefined;
	}
};

//return - true в случае, если пользователь user обладает правом right, false в противном случае
function isAuthorized(user, right) {
	if (!user || !right){
		throw new Error('user or right not valid');
	}

	let userIndex = allUsers.indexOf(user);
	let rightIndex = allRights.indexOf(right);
	if (userIndex > -1 && rightIndex > -1){
		let curUserGroups = userGroups(user);
		for(let i = 0; i < curUserGroups.length; i++){
			if (allGroups[curUserGroups[i]].indexOf(right) > -1){
				return true;
			}
		}
		return false;
	} else {
		throw new Error('user or right not existing');
	}
};


//Дополнительное задание 1. Гостевой вход
var guestUser = {nickname: "guest", groups:["basic"]}
function loginAsGuest(){
	currentSessionUser = guestUser; 
};

//Дополнительное задание 2: Вход от имени другого пользователя
function loginAs (user) {
	if (isAuthorized(currentUser(), loginAsRight)) {
		currentLoginAs = user;	
	}
}

//Дополнительное задание 3: Конроль за действиями пользователя
function securityWrapper (action, right) {
	if (isAuthorized(currentUser(), right)) {
		return action;
	}
}

//Дополнительное задание 4: Статирование действий пользователя
function addActionListener(listener) {}

//init lib - штуки, чтобы работала библиоткета 

createRight(loginAsRight);
addRightToGroup(loginAsRight, "admin");




//login tricks
login('admin', '1234');
console.log(currentUser());//admin
loginAs({nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]});
console.log(currentUser());//sobakajozhec
logout();
console.log(currentUser());//admin
logout();
console.log(currentUser());//undefined

//securityWrapper
createRight("canUseCreateRight");
addRightToGroup("canUseCreateRight", "admin");

login('admin', '1234');
securityWrapper(createRight, "canUseCreateRight")("new");
logout();

login('sobakajozhec', 'ekh228');
if (securityWrapper(createRight, "canUseCreateRight")){
	securityWrapper(createRight, "canUseCreateRight")("new2");
}
logout();

console.log(allRights);








