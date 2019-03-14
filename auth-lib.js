var allUsers = [
	{nickname: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	{nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	{nickname: "patriot007", password: "russiaFTW", groups: ["basic"]}
];
var allRights = ["manage content", "play games", "delete users", "view site"];
var allGroups = {
	"admin": [rights[2]],
	"manager": [rights[0]],
	"basic": [rights[1], rights[3]]
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
		throw new Error("error");
	}

};

//Возвращает массив всех пользователей. 
function users() {
	return allUsers; 
};

function createGroup() {};

function deleteGroup() {};

function groups() {};

function addUserToGroup() {};

//Возвращает массив групп, к которым принадлежит пользователь user 
function userGroups(user) {
	let index = allUsers.indexOf(user);
	return allUsers[index]["groups"];
};

function removeUserFromGroup() {};

function createRight() {};

function deleteRight() {};

function groupRights() {};

function rights() {};

function addRightToGroup() {};

function removeRightFromGroup() {};

function login(username, password) {};

function currentUser() {};

function logout() {};

function isAuthorized(user, right) {};
