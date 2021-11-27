El mock se hizo de esta forma porque con la librearia de jest, al intentar mockear de la forma que 
sugieren me estaba tirando error todo el tiempo. Cuando hago el jest.mock explota. Sin embargo, se trató de 
captar lo que es la escencia del mock haciendo un código impostor que simule la devolución
de la api de forma tal que se pueda probar el componente independientemente de la respuesta asíncrona.
¿Cómo se hizo? Se creó una carpeta mocks (no el __mocks__ porque estaría oculta y no la podría importar puesto que 
el jest.mock explota) en donde se tiene una copia de cada clase que interactua con la api. La idea es solamente mockear
lo que tenga relación con la api, por ende, la funcionalidad de cada componente que se desea testear (en este caso
el observatorio) se mantuvo intacta. Luego se creó un nuevo archivo de test para testear toda esta nueva integración mockeada
y poder dar fé de que el componente se comporta como corresponde.
El inconveniente de todo esto es que si en algún momento se desesa realizar un cambio en una funcionalidad existente 
del componente, que no tengan impacto en el resultado esperado, también se deberá cambiar en el mock.