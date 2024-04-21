export function errorsList(err) {
    if (!err) {
        return 'Сервер не отвечает'
    } else if (err === 401) {
        return 'Вы ввели неправильный логин или пароль.';
    } else if (err === 403) {
        return 'При авторизации произошла оишбка. Токен не передан или передан не в том формате.';
    } else if (err === 404) {
        return 'Страница по указанному маршруту не найдена';
    } else if (err === 409) {
        return 'Пользователь с таким email уже существует.';
    } else if (err === 500) {
        return 'На сервере произошла ошибка.';
    } else {
        return 'Ошибка сервера.';
    }
}