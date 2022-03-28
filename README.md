# web-programiranje-projekt

Ovaj projekt se izrađuje u sklopu kolegija Web programiranje.

Smisao aplikacije je omogućiti korisnicima pristup kvalitetnim fotografijama bez potrebe za izradom korisničkog računa te registiranim korisnicima omogućiti spremanje fotografija u galeriju koja se nalazi u aplikaciji. Mogući korisnici ove aplikacije su brojni, npr. osobe koje traže kvalitetnu fotografiju za prezentacije, projekt ili osobnu upotrebu (pozadina na računalu, mobitelu,...). Aplikacija je responzivna, tj. podržana za uređaje veće i manje dimenzije ekrana.

## Funkcionalnosti

1. Registracija - korisnikovi podaci spremaju se u bazu podataka koji će se dalje koristiti za njegovu prijavu
2. Prijava - pretraživanje baze podataka na temelju korisničkog imena i lozinke
3. Pretraživanje fotografija - dohvaćanje fotografija preko API-ja na temelju ključne riječi
4. Preuzimanje fotografija - pritiskom na gumb, na korisnikov uređaj sprema se fotografija
5. Spremanje fotografija u galeriju - odabrana fotografija sprema se u bazu podataka u obliku URL-a te je prikazana u galeriji na web stranici 
6. Uklanjanje fotografija iz galerije - odabrana fotografija uklanja se iz baze podataka te galerije na web stranici


## Opis navigacije

Prilikom pokretanja prikazane su nasumične fotografije, a iznad njih nalazi se polje za unos teksta koji predstavlja ključnu riječ za filtiranje fotografija te gumb koji pokreće funkcionalnost pretraživanja fotografija. Navedene fotografije moguće je preuzeti te ako je korisnik registiran, spremiti u galeriju. U desnom gornjem kutu nalaze se opcije za registraciju i prijavu korisnika. Pritiskom na svaku od opcija, učitava se sadržaj za određenu opciju. Prilikom registracije korisnik unosi ime, prezime, korisničko ime i lozinku, a prilikom prijave unosi korisničko ime i lozinku. Na stranici prijavljenog korisnika također se nalaze opcije pregleda galerije, odjava i uređenje korisničkih postavki. Odabirom opcije pregleda galerije, korisniku se prikazuju sve spremljene fotografije koje može ukloniti iz galerije te preuzeti. Odabirom opcije odjave, korisnika se odjavljuje sa web stranice te ga se pozicionira na početnu stranicu. Odabirom opcije uređenja korisničkih postavki, korisniku se učitavaju njegovi podaci koje može izmijeniti, ali i opcija brisanja korisničkog računa (čime će se od korisnika tražiti unos lozinke kao potvrda za brisanje). 


## Tehnologije
Tehnologije koje planiramo koristiti: 
1. HTML, CSS, JS (Vue ili React)
2. SSMS ili Firebase
3. Razvojno okruženje - VS Code
