const text_area=document.querySelector("#texto");
const texto_resuelto=document.querySelector("#texto_resuelto");
const btn_limpiar=document.querySelector("#btn_limpiar");
// Texto por defecto
//const defaultText = "Ingrese el texto aquí";  Antes se usaba el texto por defecto, ahora no por el uso de placeholder
/*
- Estas funciones se encargaban de borrar el texto por defecto al hacer clic en el área de texto y de restablecerlo si el área de texto está vacía.
- Sin embargo, se ha optado por no utilizarlas, ya que se puede emplear un marcador de posición en el área de texto para mostrar el texto por defecto (o tambien llamado placeholder) en html.
// Añade un evento de foco para borrar el texto por defecto
text_area.addEventListener('focus', function() {
    if (text_area.value === defaultText) {
        text_area.value = ''; // Borra el contenido
    }
});

// Añade un evento de desenfoque para restablecer el texto por defecto si está vacío
text_area.addEventListener('blur', function() {
    if (text_area.value === '') {
        text_area.value = defaultText; // Restablece el texto por defecto
    }
});
*/
// limpiar el texto
function limpiar(){
    //text_area.value=defaultText;  Antes se usaba el texto por defecto, ahora no por el uso de placeholder
    text_area.value='';
}

function pegar() {
    // Verificamos si el navegador soporta la API del portapapeles
    if (navigator.clipboard) {
        navigator.clipboard.readText().then(text => {
            // Insertamos el texto copiado en el área de texto
            document.getElementById("texto").value = text;
        })
        .catch(err => {
            console.error('Error al leer el portapapeles:', err);
        });
    } else {
        alert("La función de pegar no es soportada por tu navegador.");
    }
}

/* El texto a encriptar solo debe contener letras minúsculas y no debe contener caracteres especiales. */
/* Para ello cree una funcion que valide el texto ingresado. */
function validarTexto(texto){
    let letras = /^[a-zñ0-9\s.,;:!?¡¿]+$/;
    return letras.test(texto);
}


// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"
/* Este orden es importante, ya que si se cambia el orden de las letras, el texto no se encriptará correctamente. */

function btn_encriptar(){
    const texto_encriptado = encriptar(text_area.value).trim();
    if (!validarTexto(texto_encriptado)) {
        alert("Ingrese un texto válido para encriptar!!!");
        return;
    }
    texto_resuelto.value=texto_encriptado;
    mostrarBoton('btn_copiar');
    ocultarSeccion('area_texto_resuelto_elementos');
}


function encriptar(texto) {
    let relacion=[["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    for(let i=0; i<relacion.length; i++){
        if(texto.includes(relacion[i][0])){
            texto=texto.replaceAll(relacion[i][0],relacion[i][1]);
        }
    }
    return texto;
}

function btn_desencriptar(){
    const texto_desencriptado = desencriptar(text_area.value).trim();
    if(!validarTexto(texto_desencriptado)){
        alert("Ingrese un texto válido para desencriptar!!!");
        return;
    }
    texto_resuelto.value=texto_desencriptado;
    mostrarBoton('btn_copiar');
    ocultarSeccion('area_texto_resuelto_elementos');
}

function desencriptar(texto) {
    let relacion=[["enter","e"],["imes","i"],["ai","a"],["ober","o"],["ufat","u"]];
    for(let i=0; i<relacion.length; i++){
        if(texto.includes(relacion[i][0])){
            texto=texto.replaceAll(relacion[i][0],relacion[i][1]);
        }
    }
    return texto;
}

function btn_copiar(){
    const texto = document.getElementById('texto_resuelto').value;
    navigator.clipboard.writeText(texto).then(function() {
        console.log('Texto copiado al portapapeles');
        ocultarBoton('btn_copiar');
        mostrarSeccion('area_texto_resuelto_elementos');
        /*elminaremos el texto presente en esta sección*/
        document.getElementById('texto_resuelto').value='';
    }).catch(function(err) {
        console.error('Error al copiar el texto: ', err);
    });
}


// Función para hacer el botón invisible e intocable
function ocultarBoton(id) {
    const boton = document.getElementById(id);
    
    // Hacer el botón invisible e intocable
    boton.style.display = 'none'; // Alternativamente, usar 'visibility: hidden' si se desea mantener el espacio
    boton.style.pointerEvents = 'none';
}

// Función para mostrar el botón
function mostrarBoton(id) {
    const boton = document.getElementById(id);
    
    // Hacer el botón visible y clickable
    boton.style.display = 'inline-block'; // O 'block' dependiendo del diseño
    boton.style.pointerEvents = 'auto';
}

function ocultarSeccion(id) {
    var seccion = document.getElementById(id);
    seccion.style.visibility = 'hidden'; // Oculta visualmente la sección
    seccion.style.pointerEvents = 'none'; // Desactiva la interacción
}

function mostrarSeccion(id) {
    var seccion = document.getElementById(id);
    seccion.style.visibility = 'visible'; // Muestra visualmente la sección
    seccion.style.pointerEvents = 'auto'; // Activa la interacción
}

ocultarBoton('btn_copiar');

