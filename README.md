##  сделано все, кроме дополнительного 4

## Задание
Ваша задача заключается в реализации системы авторизации и контроля за действиями пользователей.

Склонируйте этот репозиторий и реализуйте функции, которые определены в файле `auth-lib.js`. Затем создайте свой собственный репозиторий и залейте код в него.

#### Часть 0. Ваши пользователи, группы и права.
В системе работают пользователи. 
Пользователи поделены на группы, каждая из которых обладает ограниченным набором прав. 
Если более формально:
<br><br>


**Право** - способность осуществить какое-либо действие в системе.


**Группа** - общность, определяемая набором прав.
<br><br>


Множество пользователей связано со множеством прав через множество групп.
Один пользователь может состоять в нескольких группах. В одной группе может состоять несколько пользователей. 
Группа определяется набором прав. Одно право может принадлежать нескольким группам.  
<br>

Таким образом между тремя сущностями: "пользователь", "группа", "право" - существуют связи типа "много-много".  
<br>

**Решите, как в вашей системе будут представлены пользователи, группы и права.**
<br><br>

#### Пример


Список пользователей как массив объектов:

<pre>
var allUsers = [
	{nickname: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	{nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	{nickname: "patriot007", password: "russiaFTW", groups: ["basic"]}
];
</pre>

Список прав как массив из строк:
<pre>
var allRights = ["manage content", "play games", "delete users", "view site"];
</pre>

Группы как объект, где ключи - имена групп, значения - массивы прав.
<pre>
var allGroups = {
	"admin": [rights[2]],
	"manager": [rights[0]],
	"basic": [rights[1], rights[3]]
}
</pre>

Вы можете смело использовать эти структуры в качестве реализации представления пользователей, групп и прав. Также допускается и приветствуется придуманная вами структура.


#### Реализовать следующие функции:


*(Здесь и далее Any в сигнатуре функции означает любой тип данных)*
<br><br>


`function users(): Array<Any>`

Возвращает массив всех пользователей. 
<br><br>

`function createUser(username: String, password: String): Any`

Создает нового пользователя с указанным логином `username` и паролем `password`, возвращает созданного пользователя. <br><br>

`function deleteUser(user: Any): undefined`

Удаляет пользователя `user` <br><br>


`function userGroups(user: Any): Array<Any>`

Возвращает массив групп, к которым принадлежит пользователь `user` <br><br>

`function addUserToGroup(user: Any, group: Any): undefined`

Добавляет пользователя `user` в группу `group` <br><br>

`function removeUserFromGroup(user: Any, group: Any): undefined`

Удаляет пользователя `user` из группы `group`. Должна бросить исключение, если пользователя `user` нет в группе `group` <br><br>

`function rights(): Array<Any>`

Возвращает массив прав <br><br>

`function createRight(): Any`

Создает новое право и возвращает его <br><br>

`function deleteRight(right: Any): undefined`

Удаляет право `right` <br><br>

`function addRightToGroup(right: Any, group: Any) : undefined`

Добавляет право `right` к группе `group` <br><br>

`function removeRightFromGroup(right: Any, group: Any) : undefined`

Удаляет право `right` из группы `group`. Должна бросить исключение, если права `right` нет в группе `group` <br><br>

`function groups(): Array<Any>`

Возвращает массив групп <br><br>

`function createGroup(): Any`

Создает новую группу и возвращает её. <br><br>

`function deleteGroup(group: Any): undefined`

Удаляет группу `group` <br><br>

`function groupRights(group: Any): Array<Any>`

Возвращает массив прав, которые принадлежат группе `group` <br><br>


Каждая из этих функций должна выбрасывать исключение в случае, если ей в качестве аргумента было передано значение неверного типа (например, если в функцию groupRights передать пользователя, вместо группы), или если это значение предполагается более не существующим в системе (например, если в функцию groupRights в качестве аргумента передать удаленную группу).

*(что такое исключение и как его выбрасывать? см. Примечания в конце этого файла)*


**Важно**
Вы только что прочитали часть спецификации системы, которую вам предстоит реализовать. Здесь и далее сигнатуры реализуемых вами функций должны быть *идентичны* функциям спецификации. Напомню, это означает точное соответствие имени функции, количества и типов аргументов и типа возвращаемого значения.

**Почему это важно?**
Потому что я не знаю и не хочу знать заранее как именно вы реализуете эти функции, какие структуры при этом будете использовать. Оценка вашей работы будет производиться автоматическими инструментами (jsamine), которые будут опираться на спецификацию выше.

#### Часть 1. Аутентификация
Здесь и далее под сессией пользователя понимается состояние системы, в котором становится возможным осуществление, определенных по некоторому правилу, набора действий.

**Реализовать следующие функции:**

`function login(username: String, password: String): Boolean`

 - *username* - идентификатор пользователя.
 - *password* - пароль.
 - *return* 	-	`true`, если пользователь с логином `username` и паролем `password` существует, `false` в противном случае.  Также функция `login` должна вернуть `false` в случае, если сессия пользователя уже существует.

В случае, если пользователь с логином `username` и паролем `password` найден в системе, вызов данной функции должен создавать сессию данного пользователя.

- - - -

`function logout(): undefined`
Вызов данной функции должен завершать сессию текущего пользователя

---

`function currentUser() : Any | undefined`

 - *return*	-	Возвращает текущего пользователя или undefined в случае, если текущий пользователь не прошел аутентифицацию

#### Часть 2. Авторизация

Реализовать функцию:

`function isAuthorized(user: Any, right: Any): Boolean`

 - `user` - пользователь
 - `right` - право
 - `return` - `true` в случае, если пользователь `user` обладает правом `right`, `false` в противном случае

#### Часть 3. Сила полезного действия

**Действия в системе** представляются в виде обычных JavaScript функций.

Воспользуйтесть только что написанной библиотекой:
1. Создайте несколько пользователей, групп и прав. Свяжите их друг с другом
2. Реализуйте несколько простых действий: обычных JavaScript функций, которые выполняют проверки: обладает ли текущий пользователь необходимым набором прав.
3. Авторизуйтесь, попытайсь выполнить несколько действий.


Цель данной части работы - продемонстрировать своё понимание того, как можно использовать реализованные функции в приложении. Я думаю, будет достаточно 30-60 строк кода.

#### Дополнительное задание 1. Гостевой вход
Реализуйте возможность аутентификации без пароля в гостевой сессии.

Если следовать строго терминологии данного документа, то "гостевая сессия" выше означает вход от имени пользователя, который принадлежит к единственной группе "Гость", обладающей минимальным набором прав.

#### Дополнительное задание 2: Вход от имени другого пользователя

`function loginAs(user: Any): undefined`

- `user` - пользователь

Вызов функции `loginAs` должен эмулировать аутентификацию от имени другого пользователя.
Доступ к функии `loginAs` должны иметь только члены привелигированной группы (например: администраторы и тестировщики).
После вызова функии `loginAs` вызов функции `logout` должен прекратить эмуляцию (вместо закрытия текущей сессии).

#### Дополнительное задание 3: Конроль за действиями пользователя

Реализовать функцию:

`function securityWrapper(action: Function, right: Any): Function`

- `action` - JavaScript функция, действие
- `right` - право
- `return` - JavaScript функция

`securityWrapper` должен возвращать функцию, вызов которой должен вернуть результат обращения к  функции `action` 
с тем же набором аргументов, но только в том случае, если текущий пользователь прошел процесс аутентификации и обладает правом `right`.

###### Пример

Если пользователь "admin" обладает правом "canIncreaseCounter", в отличие от пользователя "guest", то.
<pre>
var counter = 0;
function increaseCounter(amount) { counter += amount };
var secureIncreaseCounter = securityWrapper(increaseCounter, "canIncreaseCounter");

login("admin", "1234");  
secureIncreaseCounter(1);
logout();
counter == 1; // -> true

login("guest, "");
secureIncreaseCounter(1);
logout();
counter == 2; // -> false 
</pre>

#### Дополнительное задание 4: Статирование действий пользователя

`function addActionListener(listener: Function): undefined`

 - `listener` - функция с сигнатурой `function(user: Any, action: Function): undefined`
	 - `user` - пользователь
	 - `action` - функция-действие

Вызов функции `addActionListener` должен добавить функцию `listener` в список "наблюдателей" за действиями пользователя.

Все функции из данного списка должны быть вызваны при каждом обращении к функциям, возвращенным в качестве результата функции `securityWrapper`

###### Пример

<pre>var counter = 0;
function increaseCounter(amount) { counter += amount };
var secureIncreaseCounter = securityWrapper(increaseCounter, "canIncreaseCounter");

addActionListener(function(user, action) { 
    console.log("Пользователь " + user + " только что сделал " + action.name); 
});

addActionListener(function(user, action) { 
    alert("Пользователь " + user + " только что сделал " + action.name); 
});

login("admin", "1234");  
secureIncreaseCounter(1); // На этом моменте должно появиться всплывающее окно и
                          // сообщение в консоль
logout();

login("guest, "");
secureIncreaseCounter(1); // Аналогично, всплывающее окно и консоль
logout();
</pre>

## Тесты
Вы можете проверить корректность своей реализации при помощи автоматических тестов.

- Склонировть себе этот репозиторий
- Добавить в эту директорию реализовать функци в файле auth-lib.js
- Открыть в браузере файл index.html

Тестирование производится при помощи библиотеки [jasmine](https://jasmine.github.io/)

Посмотреть содержание тесов можно в файле tests.js.

###### Пример того, что происходит в тестах или как предполагается использовать вашу библиотеку:

<pre>
var user = createUser("admin", "1234");
deleteUser(user);
users().indexOf(user); // -> должно вернуть -1


var right = createRight();
var group = creageGroup();
var user  = createUser("user", "user");

addUserToGroup(user, group);
addRightToGroup(right, group);

isAuthorized(user, right); // -> должно быть true

userGroups(user).indexOf(group); // -> должно вернуть что-то >= 0
groupRights(group).indexOf(right); // -> должно вернуть что-то >= 0

removeRightFromGroup(right, group); // ok
removeRightFromGroup(right, group); // должен вылететь Error

</pre>

## ЧАВО
Почему у функций `createRight` и `createGroup` нет аргументов?

Потому что в контексте задания права и группы - абстрактные структуры. Меня интересует только само их существование и связи между ними, а не то, что они *означают*. 

Если хочется, то можно добавить необязательный аргумент к этим функциям с именем создаваемой сущности. Только нужно учитывать, что система тестирования не будет его указывать при вызове этих функций.

## Примечания
*То, чего не было на лекциях, но будет полезно при выполнении данного задания.*

Удалить элемент из массива можно при помощи функции [splice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)<br><br>


Под "выбрасыванием" исключения понимается следующее выражение:

`throw new Error('сообщение, описывающее возникшую ошибку')`

---

Оператор `delete` удаляет свойство объекта.
<pre>var foo = {bar: 'baz'}
foo.bar; // -> 'baz'
delete foo.bar;
foo.bar; // -> undefined</pre>

---

Любую JavaScript функцию можно вызвать, передав ей большее или меньшее количество фактических параметорв, чем формальных. В случае, если количество фактических параметров меньше количества формальных, значения недостающих аргументов будут равны `undefined`.

<pre>function identity(x) {
	return x;
}
identity(); // -> undefined
identity(1, 2, 3, 4, 5); //-> 1 </pre>

---

В теле каждой функии определена специальная переменная `arguments`, которая содержит список всех фактических переменных, переданных функции при её вызове.

<pre>function sum() {
var total = 0; 
for (var i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}
	return total;
}
sum(1, 2, 3); // -> 6 </pre>

---

Для того, чтобы вызвать функцию со списком аргументов, количество которых заранее не извесно, используется функция `apply`

Первый аргумент функции `apply`- объект, который станет значением `this` в теле вызванной функции 
Второй аргумент - массив фактических параметров, который будет передан функции в качестве аргументов.

<pre>sum.apply(null, [1,2,3]); // -> 6</pre>

`arguments` не является массивом, но может быть легко преобразован к нему при помощи выражения `Array.from(arguments)`
