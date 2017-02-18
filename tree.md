app 
  ui - части интерфейса
    mainMenu - главное меню
      add() - добавить пункт
      remove() - удалить пункт
      visible() - видимость
      [] - пункты меню
        title - заголовок
        action - колбэк действие
        click() - событие
      settings - свойства
        width - высота
        height - ширина
        
    tools - панель инструментов
      add() - добавить
      remove() - удалить
      visible() - видимость
      [] - инструменты
        title - заголовок
        action - колбэк действие
        click() - событие
      settings - свойства
        width - ширина
        height - высота
        
    viewer - вьюпорт
      mode() - режим
      visible() - видимость
      settings - свойства
        title - заголовок
        document - ссылка на документ
        width - ширина
        height - высота
        
    sidebar - боковая панель
      active - активная вкладка
      add() - добавить
      remove() - удалить
      [] - вкладки
        title - заголовок
        action - колбэк действие
        click() - событие
      settings - свойства
        width - ширина
        height - высота
        
    statusbar - статусбар
      add() - добавить
      remove() - удалить
      []
        title - заголовок
        click() - событие
      settings - свойства
        width - ширина
        height - высота
        
    panels - панели
      Propenties - панель свойств
        create() - создать
        visible() - видимость
        getProp() - взять свойства
        setProp() - отдать свойства
        
      Layers - панель слоёв
        create() - создать
        visible() - видимость
        update() - обновить
        
      Settings - панель настроек документа
        create() - создать
        visible() - видимость
        update() - обновить
        
      History - панель истории
        create() - создать
        visible() - видимость
        update() - обновить
        
  history - история
    undo() - отменить
    redo() - повторить
    step() - перейти на шаг
    clear() - очистить
    settings - свойства
      max - максимум шагов
      
  settings - свойства
    width - ширина
    height - высота
    title - название окна
    
  lang - язык перевода
    RU 
    EN
    ...
    
  document - документ
    title - заголовок
    settings - свойства
      meta - мета
      dir - директории
    save() - сохранить документ
    saveAs() - сохранить документ как
    close() - закрыть документ
    mode() - режим просмотра редактирования
    documentTree - дерево документа
    selectElem() - выбрать элемент
    active - активный элемент
      resize() - изменить размер
      drag() - переместить
      rotate() - повернуть
      remove() - удалить
      cut() - вырезать
      copy() - скопировать
      past() - вставить
      getParent() - родитель
      layer() - изменить слой
      style() - вернуть стиль
      
  jslib - библиотеки
    _ 
    $ 
    
  f - функции 
  
  open() - открыть документ
  reload() - обновить
  close() - закрыть приложение
  
  