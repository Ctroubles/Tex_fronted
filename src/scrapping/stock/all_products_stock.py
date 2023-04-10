import requests
from bs4 import BeautifulSoup
import pandas as pd
import pymongo
from pymongo import MongoClient
from fuzzywuzzy import fuzz


print("Actualizando Stock de to todos los productos: ")

print("\n")
print("Actualizando stock de Almacenamiento: ")
client = requests.Session()
html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=HDES&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')
codigos  = soup.find_all('span',)
stock = soup.find_all('label', {'class': 'Link'})
codsArr = list()
stockArr = list()
for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        codsArr.append(child.text.strip())
for i in range(len(stock)):
    stockArr.append(stock[i].text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.almacemientos
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
print(len(stockArr))
print(len(codsArr))
print(len(elementosBdArr))
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
noStock = elementosBdArr.copy()
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        stock_prod = stockArr[i]
        contador2 += 1
        if cod == cod_prod:
            if stock_prod != ">100 und":
                collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
            else:   
                collection.update_one({"_id": id_doc}, {"$set": {"stock": 100}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
for doc in noStock:
    contador2 += 1
    id_doc = doc["_id"]
    nombre_prod = doc["name"]
    contador4 += 1
    collection.update_one({"_id": id_doc}, {"$set": {"stock": 0}})
    print("Actualizado en stock 0")
    print(nombre_prod)
    contador += 1
print("Almacentamiento:")
print("Total de productos en bd: "+str(len(elementosBdArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))






print("\n")
print("Actualizando stock de Fuentes: ")
client = requests.Session()
html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=PSCS&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')
codigos  = soup.find_all('span',)
stock = soup.find_all('label', {'class': 'Link'})
codsArr = list()
stockArr = list()
for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        codsArr.append(child.text.strip())
for i in range(len(stock)):
    stockArr.append(stock[i].text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.fuentes
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
print(len(stockArr))
print(len(codsArr))
print(len(elementosBdArr))
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
noStock = elementosBdArr.copy()
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        stock_prod = stockArr[i]
        contador2 += 1
        if cod == cod_prod:
            if stock_prod != ">100 und":
                collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
            else:   
                collection.update_one({"_id": id_doc}, {"$set": {"stock": 100}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
for doc in noStock:
    contador2 += 1
    id_doc = doc["_id"]
    nombre_prod = doc["name"]
    contador4 += 1
    collection.update_one({"_id": id_doc}, {"$set": {"stock": 0}})
    print("Actualizado en stock 0")
    print(nombre_prod)
    contador += 1
print("Fuentes de poder:")
print("Total de productos en bd: "+str(len(elementosBdArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))






print("\n")
print("Actualizando stock de tarjetas gráficas: ")
client = requests.Session()
html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=VID&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')
codigos  = soup.find_all('span',)
stock = soup.find_all('label', {'class': 'Link'})
codsArr = list()
stockArr = list()
for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        codsArr.append(child.text.strip())
for i in range(len(stock)):
    stockArr.append(stock[i].text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.graficas
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
print(len(stockArr))
print(len(codsArr))
print(len(elementosBdArr))
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
noStock = elementosBdArr.copy()
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        stock_prod = stockArr[i]
        contador2 += 1
        if cod == cod_prod:
            if stock_prod != ">100 und":
                collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
            else:   
                collection.update_one({"_id": id_doc}, {"$set": {"stock": 100}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
for doc in noStock:
    contador2 += 1
    id_doc = doc["_id"]
    nombre_prod = doc["name"]
    contador4 += 1
    collection.update_one({"_id": id_doc}, {"$set": {"stock": 0}})
    print("Actualizado en stock 0")
    print(nombre_prod)
    contador += 1
print("Tarjetas gráficas:")
print("Total de productos en bd: "+str(len(elementosBdArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))






print("\n")
print("Actualizando stock de tarjetas gráficas: ")
client = requests.Session()
html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=VID&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')
codigos  = soup.find_all('span',)
stock = soup.find_all('label', {'class': 'Link'})
codsArr = list()
stockArr = list()
for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        codsArr.append(child.text.strip())
for i in range(len(stock)):
    stockArr.append(stock[i].text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.graficas
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
print(len(stockArr))
print(len(codsArr))
print(len(elementosBdArr))
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
noStock = elementosBdArr.copy()
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        stock_prod = stockArr[i]
        contador2 += 1
        if cod == cod_prod:
            if stock_prod != ">100 und":
                collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
            else:   
                collection.update_one({"_id": id_doc}, {"$set": {"stock": 100}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
for doc in noStock:
    contador2 += 1
    id_doc = doc["_id"]
    nombre_prod = doc["name"]
    contador4 += 1
    collection.update_one({"_id": id_doc}, {"$set": {"stock": 0}})
    print("Actualizado en stock 0")
    print(nombre_prod)
    contador += 1
print("Tarjetas gráficas:")
print("Total de productos en bd: "+str(len(elementosBdArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))






print("\n")
print("Actualizando stock de procesadores: ")
client = requests.Session()
html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=CPU&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')
codigos  = soup.find_all('span',)
stock = soup.find_all('label', {'class': 'Link'})
codsArr = list()
stockArr = list()
for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        codsArr.append(child.text.strip())
for i in range(len(stock)):
    stockArr.append(stock[i].text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.procesadores
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
print(len(stockArr))
print(len(codsArr))
print(len(elementosBdArr))
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
noStock = elementosBdArr.copy()
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        stock_prod = stockArr[i]
        contador2 += 1
        if cod == cod_prod:
            if stock_prod != ">100 und":
                collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
            else:   
                collection.update_one({"_id": id_doc}, {"$set": {"stock": 100}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
for doc in noStock:
    contador2 += 1
    id_doc = doc["_id"]
    nombre_prod = doc["name"]
    contador4 += 1
    collection.update_one({"_id": id_doc}, {"$set": {"stock": 0}})
    print("Actualizado en stock 0")
    print(nombre_prod)
    contador += 1
print("Procesadores:")
print("Total de productos en bd: "+str(len(elementosBdArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))







print("\n")
print("Actualizando stock de memorias Ram: ")
client = requests.Session()
html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=MEM&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')
codigos  = soup.find_all('span',)
stock = soup.find_all('label', {'class': 'Link'})
codsArr = list()
stockArr = list()
for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        codsArr.append(child.text.strip())
for i in range(len(stock)):
    stockArr.append(stock[i].text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.rams
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
print(len(stockArr))
print(len(codsArr))
print(len(elementosBdArr))
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
noStock = elementosBdArr.copy()
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        stock_prod = stockArr[i]
        contador2 += 1
        if cod == cod_prod:
            if stock_prod != ">100 und":
                collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
            else:   
                collection.update_one({"_id": id_doc}, {"$set": {"stock": 100}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
for doc in noStock:
    contador2 += 1
    id_doc = doc["_id"]
    nombre_prod = doc["name"]
    contador4 += 1
    collection.update_one({"_id": id_doc}, {"$set": {"stock": 0}})
    print("Actualizado en stock 0")
    print(nombre_prod)
    contador += 1
print("Memorias Ram:")
print("Total de productos en bd: "+str(len(elementosBdArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))
print("\n")







print("Actualizando stock de Motherboards: ")
client = requests.Session()
html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=MBD&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')
codigos  = soup.find_all('span',)
stock = soup.find_all('label', {'class': 'Link'})
codsArr = list()
stockArr = list()
for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        codsArr.append(child.text.strip())
for i in range(len(stock)):
    stockArr.append(stock[i].text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.motherboards
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
print(len(stockArr))
print(len(codsArr))
print(len(elementosBdArr))
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
noStock = elementosBdArr.copy()
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        stock_prod = stockArr[i]
        contador2 += 1
        if cod == cod_prod:
            if stock_prod != ">100 und":
                collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
            else:   
                collection.update_one({"_id": id_doc}, {"$set": {"stock": 100}})
                print("Actualizado")
                print(nombre_prod)
                contador3 += 1
                contador += 1
                noStock.remove(doc)
                break
for doc in noStock:
    contador2 += 1
    id_doc = doc["_id"]
    nombre_prod = doc["name"]
    contador4 += 1
    collection.update_one({"_id": id_doc}, {"$set": {"stock": 0}})
    print("Actualizado en stock 0")
    print(nombre_prod)
    contador += 1
print("Memorias Motherboards:")
print("Total de productos en bd: "+str(len(elementosBdArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))