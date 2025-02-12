import requests



#input de origen y destino

origen = input("ingrese Ciudad Origen: ")
destino = input("Ingrese la Ciudad Destino: ")

#API

url = f"http://localhost:3000/api/rutas/{origen}/{destino}"


response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    if "ruta" in data and data["ruta"]:
        ruta = data["ruta"]
        print(f"\n✅ Ruta calculada: {' ➝ '.join(ruta)}\n")

        #simulacion

        
                #recalcular la ruta
        for i in range(len(ruta)- 1):
                    print(f" {ruta[i]}")
                    input("Enter para continuar")
                    url = f"http://localhost:3000/api/rutas/{origen}/{destino}"
                    response = requests.get(url)
                    if response.status_code == 200:
                            data = response.json()
                            if "ruta" in data and data["ruta"]:
                                ruta = data["ruta"]
                            else: 
                                 print("No se pudo actualizar la ruta")
                    print(f" avanzando ruta:  {ruta[i]}")
        print(f" avanzando ruta:  {ruta[i+1]}")

        print("LLegaste al destino")
    else: 
         print("no se pudo obtener la ruta")
else: 
     print("Error al Conectar con API NODE. JS")
            

