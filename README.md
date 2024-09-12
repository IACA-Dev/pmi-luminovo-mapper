<h1 align="center">PMI  Luminovo mapper </h1>
<p align="center">Powered by </p>
<p align="center">
<a href="https://iaca-electronique.com">
<img style="" width="250px" src="https://www.iaca-electronique.com/img/logo.png">
</a>
</p>

___

## 📄 Purpose

This program allow to generate Luminovo csv files needed by their software :
* `luminovo_tenantname_ipns.csv`
* `luminovo_tenantname_inventory.csv`

Program will retrieve data from PMI database.

### ⚠️ Requirements
* Node version >= 18.18
* NPM version >= 18.18

___

## ▶️ Usage

```bash
Options:   
  -d, --directory     Output directory                    
  -n, --company-name  Name of company
  
  --help              Show help                                        
```

> **Important :** You need to setup `.env` and place it in your working directory.
> 
> *Example available here* : [.env.example](.env.example)

### From GIT

```bash
# Git import
git clone https://github.com/IACA-Dev/pmi-luminovo-mapper.git
cd pmi-luminovo-mapper

# Install
npm i

# Build
npm run build

# Setup environment
cp .env.example .env
nano .env

# Run
node dist/main.js -n "company name" -d "output directory"
```
___ 
## ✍️ Dev

### Import
```bash
git clone https://github.com/IACA-Dev/pmi-luminovo-mapper.git
cd pmi-luminovo-mapper
```

### Install

```bash
npm i
```

### Hot run

```bash
npm run start:dev
```

### Build

```bash
npm run build
```

> Will generate `dist` directory with build.



## 🧑‍🤝‍🧑 Contributors

* Julien FAURE [✉️ julien.faure@iaca-electronique.com](mailto:julien.faure@iaca-electronique.com) (*IACA Electronique*)