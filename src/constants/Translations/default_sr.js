export const translation = {
  menu_items: {
    userRequestPanel: 'Korisnički panel',
    userList: 'Korisnici',
    roleList: 'Role',
    fridgeList: 'Frižideri',
  },

  Login: {
    title: 'Prijava',
    Form: {
      Placeholders: {
        username: 'Korisničko ime',
        password: 'Lozinka',
      },
      Errors: {
        username: 'Potrebno je uneti korisničko ime',
        password: 'Potrebno je uneti lozinku',
      },
      Buttons: {
        submit: 'Prijava',
      },
    },
    Modals: {
      title: 'Verifikacija korisnika',
      ModalForPasswordChangeTitle: 'Promena lozinke',
    },
    NotificationMessages: {
      errorTitle: 'Greška',
      passwordChange: 'Promena lozinke',
    },
  },

  Global: {
    appName: 'Fridge',
    Button: {
      save: 'Sačuvaj',
      edit: 'Izmeni',
      delete: 'Obriši',
      deactivate: 'Deaktiviraj',
      goBack: 'Vrati nazad',
      quit: 'Odustani',
      print: 'Odštampaj',
      yes: 'DA',
      no: 'NE',
      confirm: 'U redu',
      control: 'Proveri',
    },
    Tooltips: {
      logout: 'Odjava',
    },
    EnhancedTable: {
      rowPerPage: 'Broj redova:',
      of: ' od ',
    },
    Lang: {
      sr: 'Latinica',
      sr_cyr: 'Ћирилица',
    },
    Filter: {
      title: 'Pretraga',
      reset: 'Obriši',
      submit: 'Pretraži',
      NotificationMessages: {
        errorTitle: 'Greška',
        notFoundMessage: 'Nije pronađen nijedan rekord',
      },
    },
  },

  Enums: {},

  SearchFilter: {
    Placeholders: {
      fieldText: 'Filter...',
    },
  },

  DatePicker: {
    Placeholders: {
      dateFormat: 'dd/mm/gggg',
    },
  },

  AttachmentTable: {
    name: 'Naziv',
    preview: 'Pregled',
    fileFormat: 'Format',
    download: 'Preuzimanje',
    upload: 'Priloženi dokumenti',
    delete: 'Brisanje',
    NotificationMessages: {
      unsuccessfulDownload: 'Došlo je do greške prilikom preuzimanja dokumenta',
    },
    ConfirmDialog: {
      confirmMessage: 'Da li zaista želite da obrišete fajl?',
    },
  },

  TransferList: {
    Choices: 'Izbor',
    Chosen: 'Odabrano',
    selected: 'obeleženo',
  },

  Authentication2faForm: {
    Placeholders: {
      verifyCode: 'Verifikacioni kod',
    },
    Errors: {
      verifyCode: 'Potrebno je uneti verifikacioni kod',
    },
  },
  PasswordChangeForm: {
    Placeholders: {
      oldPassword: 'Stara lozinka',
      newPassword: 'Nova lozinka',
      confirmNewPassword: 'Potvrda lozinke',
    },
    Errors: {
      oldPassword: 'Potrebno je uneti staru lozinku',
      newPassword: 'Potrebno je uneti novu lozinku',
      confirmNewPassword: 'Potrebno je uneti ponovljenu lozinku',
      passwordAndConfirmPasswordMatch:
        'Vrednosti za lozinku i ponovljenu lozinku nisu iste.',
    },
  },

  LanguagePicker: {
    Tooltips: {
      languagePicker: 'Promena jezika',
    },
  },

  UnauthorizedAccessPage: {
    title: 'Stranica nije pronađena',
  },

  UserPage: {
    UserTable: {
      tableTitle: 'Korisnici',
      HeaderColumns: {
        username: 'Korisničko ime',
        firstName: 'Ime',
        lastName: 'Prezime',
        active: 'Aktivan',
        activateDeactivate: 'Aktiviraj / Deaktiviraj',
        edit: 'Izmena',
        updatePassword: 'Izmena lozinke',
        changeStatus2fa: 'Aktiviraj / Deaktiviraj 2FA',
        delete: 'Brisanje',
      },
      Tooltips: {
        addItem: 'Dodaj novog korisnika',
        activate: 'Aktiviraj korisnika',
        deactivate: 'Deaktiviraj korisnika',
        activate2fa: 'Aktiviraj dvofaktorsku autentikaciju',
        deactivate2fa: 'Deaktiviraj dvofaktorsku autentikaciju',
      },
      ConfirmDialog: {
        deactivateMessage:
          'Da li zaista želite da deaktivirate izabranog korisnika?',
        activateMessage: 'Da li želite da aktivirate izabranog korisnika?',
        deleteMessage: 'Da li zaista želite da obrišete izabranog korisnika?',
        deactivate2faMessage:
          'Da li zaista želite da deaktivirate dvofaktorsku autentikaciju za izabranog korisnika?',
      },
      NotificationMessages: {
        title: 'Korisnik',
        errorTitle: 'Greška',
        roleTitle: 'Role',
        successCreation: 'Korisnik je uspešno sačuvan',
        successUpdate: 'Podaci o korisniku su uspešno izmenjeni',
        successDelete: 'Korisnik je uspešno obrisan',
        successDeactivation: 'Korisnik je uspešno deaktiviran',
        successActivation: 'Korisnik je uspešno aktiviran',
        successPasswordUpdate: 'Lozinka je uspešno promenjena',
        success2faConfirm:
          'Korisniku je uspešno aktivirana dvofaktorska autentikacija',
      },
    },
    Form: {
      Placeholders: {
        firstName: 'Ime',
        lastName: 'Prezime',
        username: 'Korisničko ime',
        password: 'Lozinka',
        confirmPassword: 'Ponovljena lozinka',
        email: 'Imejl',
        phoneNumber: 'Broj telefona',
        listRoles: 'Lista rola',
      },
      Errors: {
        username: 'Potrebno je uneti korisničko ime.',
        password: 'Potrebno je uneti lozinku.',
        firstName: 'Potrebno je uneti ime',
        lastName: 'Potrebno je uneti prezime',
        roles: 'Potrebno je odabrati barem jednu ulogu',
        email: 'Potrebno je uneti imejl',
        confirmPassword: 'Potrebno je uneti ponovljenu lozinku.',
        passwordAndConfirmPasswordMatch:
          'Vrednosti za lozinku i ponovljenu lozinku nisu iste.',
        passwordLength: 'Lozinka ne može biti kraća od 8 karaktera',
      },
      TransferList: {
        Choices: 'Izbor rola',
      },
      Tooltips: {
        generateUsername: 'Generiši korisničko ime',
        generatePassword: 'Generiši lozinku',
      },
      Labels: {
        generate: 'Generiši',
      },
    },
    Modals: {
      modalForAddTitle: 'Dodavanje novog korisnika',
      modalForUpdateTitle: 'Izmena korisnika',
      modalForUpdatePasswordTitle: 'Izmena lozinke korisnika',
      modalFor2faRegistartion:
        'Skenirajte QR kod pomoću Google Authenticator aplikacije',
    },
    Filters: {
      roles: 'Rola',
      firstName: 'Ime',
      lastName: 'Prezime',
      createdAtFrom: 'Datum kreiranja od',
      createdAtTo: 'Datum kreiranja do',
    },
  },

  RolePage: {
    RoleTable: {
      tableTitle: 'Role',
      HeaderColumns: {
        roleName: 'Naziv role',
        actions: 'Akcije',
        delete: 'Brisanje',
      },
      Tooltips: {
        addItem: 'Dodaj novu rolu',
      },
      ConfirmDialog: {
        deleteMessage: 'Da li zaista želite da obrišete rolu?',
      },
      NotificationMessages: {
        title: 'Role',
        errorTitle: 'Greška',
        successCreation: 'Rola je uspešno sačuvana',
        successUpdate: 'Rola je uspešno izmenjena',
        successDelete: 'Rola je uspešno obrisana',
      },
    },
    Modals: {
      modalForAddTitle: 'Dodavanje nove role',
      modalForUpdateTitle: 'Izmena role',
    },
    Form: {
      Placeholders: {
        roleName: 'Naziv',
      },
      Errors: {
        roleName: 'Potrebno je uneti naziv role',
      },
      TransferList: {
        Choices: 'Izbor akcija',
      },
    },
  },

  FridgePage: {
    FridgeTable: {
      tableTitle: 'Frižideri',
      HeaderColumns: {
        name: 'Naziv',
        edit: 'Izmena',
        delete: 'Brisanje',
        details: 'Pregled',
      },
      Tooltips: {
        addItem: 'Dodaj novi frižider',
      },
      ConfirmDialog: {
        deleteMessage: 'Da li zaista želite da obrišete frižider?',
      },
      NotificationMessages: {
        title: 'Frižideri',
        errorTitle: 'Greška',
        successCreation: 'Frižider je uspešno sačuvan',
        successUpdate: 'Frižider je uspešno izmenjen',
        successDelete: 'Frižider je uspešno obrisan',
      },
    },
    Modals: {
      modalForAddTitle: 'Dodavanje novog frižidera',
      modalForUpdateTitle: 'Izmena frižidera',
      modalForDetailsTitle: 'Trenutno stanje',
    },
    Form: {
      Placeholders: {
        fridgeName: 'Naziv',
        milkYes: 'Mleko je trenutno na stanju',
        milkNo: 'Mleko trenutno nije na stanju',
        eggsYes: 'Jaja su trenutno na stanju',
        eggsNo: 'Jaja trenutno nisu na stanju',
        mealYes: 'Meso je trenutno na stanju',
        mealNo: 'Meso trenutno nije na stanju',
      },
      Errors: {
        fridgeName: 'Potrebno je uneti naziv frižidera',
      },
    },
  },
};
