import os
import requests
import random
import string
from typing import List, Dict, Optional
from dotenv import load_dotenv
from authentication_client import AuthenticationClient
from product_client import ProductClient

load_dotenv()  # Carga variables de entorno desde .env


def main():
    # Variables desde .env
    base_host = os.getenv('ROBLE_BASE_HOST')
    contract = os.getenv('ROBLE_CONTRACT')

    if not all([base_host, contract]):
        print("Define ROBLE_BASE_HOST y ROBLE_CONTRACT en el .env")
        return

    auth_client = AuthenticationClient(base_host, contract)
    product_client = ProductClient(base_host, contract, auth_client)

    while True:
        print("\n=== Menú Roble Client ===")
        print("1. Login")
        print("2. Logout")
        print("3. Crear usuario")
        print("4. Crear usuario solo con email (clave ThePassword!1)")
        print("5. Mostrar tokens actuales")
        print("6. Renovar token")

        print("7. Listar productos")
        print("8. Agregar producto manual")
        print("9. Actualizar producto")
        print("10. Eliminar producto")
        print("11. Eliminar todos los productos")
        print("12. Agregar 30 productos aleatorios")

        print("13. Salir")
        choice = input("Selecciona una opción: ")

        try:
            if choice == '1':
                auth_client.login()
            elif choice == '2':
                auth_client.logout()
            elif choice == '3':
                auth_client.signup()  
            elif choice == '4':
                auth_client.signupFast()                  
            elif choice == '5':
                auth_client.show_tokens()
            elif choice == '6':
                auth_client.refresh()

            elif choice == '7':
                products = product_client.get_products()
                for p in products:
                    print(p)
            elif choice == '8':
                name = input("Nombre: ")
                desc = input("Descripción: ")
                qty = int(input("Cantidad: "))
                product_client.add_product({'name': name, 'description': desc, 'quantity': qty})
            elif choice == '9':
                pid = input("ID del producto a actualizar: ")
                key = input("Campo a actualizar (name/description/quantity): ")
                val = input("Nuevo valor: ")
                updates = {key: int(val) if key == 'quantity' else val}
                product_client.update_product(pid, updates)
            elif choice == '10':
                pid = input("ID del producto a eliminar: ")
                product_client.delete_product(pid)
            elif choice == '11':
                confirm = input("¿Seguro? Esto eliminará TODOS los productos (s/n): ")
                if confirm.lower() == 's':
                    product_client.delete_all_products()
            elif choice == '12':
                product_client.add_random_products(30)

            elif choice == '13':
                print("Saliendo...")
                break
            else:
                print("Opción no válida.")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == '__main__':
    main()
