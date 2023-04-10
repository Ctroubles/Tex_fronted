import requests
from bs4 import BeautifulSoup
import pandas as pd
import pymongo
from pymongo import MongoClient
from fuzzywuzzy import fuzz



print("Vamo a scrappear")

client = requests.Session()

html = client.get("https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor.php?MarcaId=&LineaProductoId=&tamPag=70&PlantillaNodoIds=&ValorId=&LoadInput=2&CheckTopBrand=0&TipoUsoId=&GrupoLineaId=CPU&chkStock=1&chkActivo=1&cboAlmacenes=011&cboTipoBusquedaItems=&txtBusquedaItems=").content
soup = BeautifulSoup(html, 'lxml')


codigos  = soup.find_all('span',)

stock = soup.find_all('label', {'class': 'Link'})


cods = list()
stockk = list()

for i in range(len(codigos)):
    b_children = codigos[i].findChildren('a', recursive=False)
    for child in b_children:
        cods.append(child.text.strip())


for i in range(len(stock)):
    stockk.append(stock[i].text.strip())



# dataFrame = pd.DataFrame({"Nombre":names,"Stock:":stockk})

# dataFrame.to_csv("StockProcesadores_Daaaaa.csv", index=False)




#Conexión a la base de datos MongoD
client = MongoClient('mongodb+srv://tex_user:8SZ8tlEcnjVI16TR@cluster0aws.reehusu.mongodb.net/tex-db?retryWrites=true&w=majority')
db = client['tex-db']
collection = db.procesadores
elementosBd = collection.find()



elementosBdArr = list(elementosBd)

print(len(stockk))
print(len(cods))
print(len(elementosBdArr))

contador = 0
contador2 = 0
contador3 = 0
contador4 = 0

# for i, cod in enumerate(cods):
#     stock_prod = stockk[i]
#     contador3 += 1
#     for doc in elementosBdArr:
#         id_doc = doc["_id"]
#         cod_prod = doc["cod"]
#         nombre_prod = doc["name"]
#         contador2 += 1
#         if cod == cod_prod:
#             collection.update_one({"_id": id_doc}, {"$set": {"stock": stock_prod}})
#             print("Actualizado")
#             print(nombre_prod)
#             # print(stock_prod)
#             contador += 1
#             # Eliminar el documento actual de la lista para hacer la búsqueda más eficiente
#             elementosBdArr.remove(doc)
#             break  # Salir del loop interno una vez que se actualizó el stock


noStock = elementosBdArr.copy()

for doc in elementosBdArr:
    id_doc = doc["_id"]
    cod_prod = doc["cod"]
    nombre_prod = doc["name"]
    for i, cod in enumerate(cods):
        stock_prod = stockk[i]
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
    # print(stock_prod)
    contador += 1


print("Vueltas totales: "+str(contador2))
print("Total Productos Actualizado: "+str(contador))
print("Productos con stock: "+str(contador3))
print("Productos sin stock: "+str(contador4))





  