from selenium import webdriver
import time
import pyautogui
from selenium.webdriver.common.by import By
from pymongo import MongoClient
from bs4 import BeautifulSoup
import requests
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
import sys
import codecs
import re


user = "10749898271"
password = "363464"




driver = webdriver.Chrome()
driver.get("https://www.deltron.com.pe/login.php?prev=/index_2.php?&webuser=10749898271")
time.sleep(1.5)
pyautogui.typewrite(user)
pyautogui.press("tab")
pyautogui.typewrite(password)
pyautogui.press("tab")
pyautogui.press('enter')


print("Actualizando precios de Almacenamientos: ")
driver.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=HDES&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=")
codigos = driver.find_elements(By.TAG_NAME, "span")
precios = driver.find_elements(By.XPATH, "//span[@style='text-decoration:none; cursor:auto;']")
codsArr = list()
pricesArr = list()
for desc in precios:
    s = desc.text.strip().replace("S/. ", "").replace(" Inc. IGV", "").replace(",", "")
    numero = float(s)
    pricesArr.append(numero)
    print(numero)
    print(desc.text.strip())
for span in codigos:
    links = span.find_elements(By.XPATH, "./a")
    for link in links:
        codsArr.append(link.text.strip())
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.almacemientos
elementosBd = collection.find()
elementosBdArr = list(elementosBd)
noStock = elementosBdArr.copy()
contador = 0
contador2 = 0
contador3 = 0
contador4 = 0
for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(codsArr):
        price_prod = pricesArr[i]
        contador2 += 1
        if cod == cod_prod:
            collection.update_one({"_id": id_doc}, {"$set": {"price": price_prod}})
            print("Actualizado")
            print(nombre_prod)
            contador3 += 1
            contador += 1
            noStock.remove(doc)
            break   
print("Almacenamientos: ")
print("Productos totales en base de datos: "+ str(len(elementosBdArr)))
print("Códigos de productos en la página: "+ str(len(codsArr)))
print("Precios de productos en la página: "+ str(len(pricesArr)))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(len(noStock)))
time.sleep(2)

