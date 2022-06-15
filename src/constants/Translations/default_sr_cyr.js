export const translation = {
  menu_items: {
    userRequestPanel: 'Кориснички панел',
    userList: 'Корисници',
    roleList: 'Роле',
    fridgeList: 'Фрижидери',
  },

  Login: {
    title: 'Пријава',
    Form: {
      Placeholders: {
        username: 'Корисничко име',
        password: 'Лозинка',
      },
      Errors: {
        username: 'Потребно je унети корисничко име',
        password: 'Потребно je унети лозинку',
      },
      Buttons: {
        submit: 'Пријава',
      },
    },
    Modals: {
      title: 'Верификација корисника',
      ModalForPasswordChangeTitle: 'Промена лозинке',
    },
    NotificationMessages: {
      errorTitle: 'Грешка',
      passwordChange: 'Промена лозинке',
    },
  },

  Global: {
    appName: 'Fridge',
    Button: {
      save: 'Сачувај',
      edit: 'Измени',
      delete: 'Обриши',
      deactivate: 'Деактивирај',
      goBack: 'Врати назад',
      quit: 'Одустани',
      print: 'Одштампај',
      yes: 'ДА',
      no: 'НЕ',
      confirm: 'У реду',
      control: 'Провери',
    },
    Tooltips: {
      logout: 'Одјава',
    },
    EnhancedTable: {
      rowPerPage: 'Број редова:',
      of: ' од ',
    },
    Lang: {
      sr: 'Latinica',
      sr_cyr: 'Ћирилица',
    },
    Filter: {
      title: 'Претрага',
      reset: 'Обриши',
      submit: 'Претражи',
      NotificationMessages: {
        errorTitle: 'Грешка',
        notFoundMessage: 'Није пронађен ниједан рекорд',
      },
    },
  },

  Enums: {},

  SearchFilter: {
    Placeholders: {
      fieldText: 'Филтер...',
    },
  },

  DatePicker: {
    Placeholders: {
      dateFormat: 'дд/мм/гггг',
    },
  },

  AttachmentTable: {
    name: 'Назив',
    preview: 'Преглед',
    fileFormat: 'Формат',
    download: 'Преузимање',
    upload: 'Приложени документи',
    delete: 'Брисање',
    NotificationMessages: {
      unsuccessfulDownload: 'Дошло je до грешке приликом преузимања документа',
    },
    ConfirmDialog: {
      confirmMessage: 'Да ли заиста желите да обришете фајл?',
    },
  },

  TransferList: {
    Choices: 'Избор',
    Chosen: 'Одабрано',
    selected: 'обележено',
  },

  Authentication2faForm: {
    Placeholders: {
      verifyCode: 'Верификациони код',
    },
    Errors: {
      verifyCode: 'Потребно je унети верификациони код',
    },
  },

  PasswordChangeForm: {
    Placeholders: {
      oldPassword: 'Стара лозинка',
      newPassword: 'Нова лозинка',
      confirmNewPassword: 'Потврда лозинке',
    },
    Errors: {
      oldPassword: 'Потребно je унети стару лозинку',
      newPassword: 'Потребно je унети нову лозинку',
      confirmNewPassword: 'Потребно je унети поновљену лозинку',
      passwordAndConfirmPasswordMatch:
        'Вредности за лозинку и поновљену лозинку нису исте',
    },
  },

  LanguagePicker: {
    Tooltips: {
      languagePicker: 'Промена језика',
    },
  },

  UnauthorizedAccessPage: {
    title: 'Страница није пронађена',
  },

  UserPage: {
    UserTable: {
      tableTitle: 'Корисници',
      HeaderColumns: {
        username: 'Корисничко име',
        firstName: 'Име',
        lastName: 'Презиме',
        active: 'Активан',
        activateDeactivate: 'Активирај / Деактивирај',
        edit: 'Измена',
        updatePassword: 'Измена лозинке',
        changeStatus2fa: 'Активирај / Деактивирај 2ФА',
        delete: 'Брисање',
      },
      Tooltips: {
        addItem: 'Додај новог корисника',
        activate: 'Активирај корисника',
        deactivate: 'Деактивирај корисника',
        activate2fa: 'Активирај двофакторску аутентикацију',
        deactivate2fa: 'Деактивирај двофакторску аутентикацију',
      },
      ConfirmDialog: {
        deactivateMessage:
          'Да ли заиста желите да деактивирате изабраног корисника?',
        activateMessage: 'Да ли желите да активирате изабраног корисника?',
        deleteMessage: 'Да ли заиста желите да обришете изабраног корисника?',
        deactivate2faMessage:
          'Да ли заиста желите да деактивирате двофакторску аутентикацију за изабраног корисника?',
      },
      NotificationMessages: {
        title: 'Корисник',
        errorTitle: 'Грешка',
        roleTitle: 'Роле',
        successCreation: 'Корисник je успешно сачуван',
        successUpdate: 'Подаци o кориснику су успешно измењени',
        successDelete: 'Корисник je успешно обрисан',
        successDeactivation: 'Корисник je успешно деактивиран',
        successActivation: 'Корисник je успешно активиран',
        successPasswordUpdate: 'Лозинка je успешно промењена',
        success2faConfirm:
          'Кориснику je успешно активирана двофакторска аутентикација',
      },
    },
    Form: {
      Placeholders: {
        firstName: 'Име',
        lastName: 'Презиме',
        username: 'Корисничко име',
        confirmPassword: 'Поновљена лозинка',
        password: 'Лозинка',
        email: 'Имејл',
        phoneNumber: 'Број телефона',
        listRoles: 'Листа рола',
      },
      Errors: {
        username: 'Потребно je унети корисничко име.',
        password: 'Потребно je унети лозинку.',
        firstName: 'Потребно je унети име',
        lastName: 'Потребно je унети презиме',
        roles: 'Потребно je одабрати барем једну ролу',
        email: 'Потребно je унети имејл',
        confirmPassword: 'Потребно je унети поновљену лозинку.',
        passwordAndConfirmPasswordMatch:
          'Вредности за лозинку и поновљену лозинку нису исте.',
        passwordLength: 'Лозинка не може бити краћа од 8 карактера',
      },
      TransferList: {
        Choices: 'Избор rola',
      },
      Tooltips: {
        generateUsername: 'Генериши корисничко име',
        generatePassword: 'Генериши лозинку',
      },
      Labels: {
        generate: 'Генериши',
      },
    },
    Modals: {
      modalForAddTitle: 'Додавање новог корисника',
      modalForUpdateTitle: 'Измена корисника',
      modalForUpdatePasswordTitle: 'Измена лозинке корисника',
      modalFor2faRegistartion:
        'Скенирајте QR код помоћу Google Authenticator апликације',
    },
    Filters: {
      roles: 'Рола',
      firstName: 'Име',
      lastName: 'Презиме',
      createdAtFrom: 'Датум креирања од',
      createdAtTo: 'Датум креирања до',
    },
  },

  RolePage: {
    RoleTable: {
      tableTitle: 'Роле',
      HeaderColumns: {
        roleName: 'Назив роле',
        actions: 'Akcije',
        delete: 'Брисање',
      },
      Tooltips: {
        addItem: 'Додај нову ролу',
      },
      ConfirmDialog: {
        deleteMessage: 'Да ли заиста желите да обришете ролу?',
      },
      NotificationMessages: {
        title: 'Роле',
        errorTitle: 'Грешка',
        successCreation: 'Рола je успешно сачувана',
        successUpdate: 'Рола je успешно измењена',
        successDelete: 'Рола je успешно обрисана',
      },
    },
    Modals: {
      modalForAddTitle: 'Додавање нове роле',
      modalForUpdateTitle: 'Измена роле',
    },
    Form: {
      Placeholders: {
        roleName: 'Назив',
      },
      Errors: {
        roleName: 'Потребно je унети назив роле',
      },
      TransferList: {
        Choices: 'Избор акција',
      },
    },
  },

  FridgePage: {
    FridgeTable: {
      tableTitle: 'Фрижидери',
      HeaderColumns: {
        name: 'Назив',
        edit: 'Измена',
        delete: 'Брисање',
        details: 'Преглед',
      },
      Tooltips: {
        addItem: 'Додај нови фрижидер',
      },
      ConfirmDialog: {
        deleteMessage: 'Да ли заиста желите да обришете фрижидер?',
      },
      NotificationMessages: {
        title: 'Фрижидери',
        errorTitle: 'Грешка',
        successCreation: 'Фрижидер je успешно сачуван',
        successUpdate: 'Фрижидер je успешно измењен',
        successDelete: 'Фрижидер je успешно обрисан',
      },
    },
    Modals: {
      modalForAddTitle: 'Додавање новог фрижидера',
      modalForUpdateTitle: 'Измена фрижидера',
      modalForDetailsTitle: 'Тренутно стање',
    },
    Form: {
      Placeholders: {
        fridgeName: 'Назив',
        temperaturе: 'Температура: ',
        humidity: 'Влажност: ',
        milk: 'Млеко: ',
        cheese: 'Сир: ',
        milkYes: 'Млеко је тренутно на стању',
        milkNo: 'Млеко тренутно није на стању',
        cheeseYes: 'Сир је тренутно на стању',
        cheeseNo: 'Сир тренутно није на стању',
      },
      Errors: {
        fridgeName: 'Потребно je унети назив фрижидера',
      },
    },
  },
};
