// Datos de las preguntas del quiz de Sistemas Operativos - Tanenbaum
const quizData = [
    {
        id: 1,
        question: "El sistema Operativo…",
        options: [
            "Se ejecuta en modo Usuario, sin acceso al hardware de la computadora",
            "Se ejecuta en modo Kernel, con Acceso restringido al hardware de la computadora", 
            "Se ejecuta en modo Kernel, con total acceso al hardware de la computadora",
            "Ninguna de las anteriores es correcta"
        ],
        correct: 2,
        explanation: "El modo Kernel, por definición, otorga acceso total y sin restricciones al hardware. Es crucial que utilice este modo para planificación de procesos, gestión de memoria, y protección del sistema, sin restricciones.",
        wrongExplanations: [
            "El SO no se ejecuta en modo usuario, ya que se ejecutan en modo Kernel para proteger la integridad del sistema y gestionar el Hardware. Las aplicaciones de usuario sí lo hacen",
            "El modo Kernel, por definición, otorga acceso total y sin restricciones al hardware. Tanenbaum afirma que el modo Kernel tiene 'Privilegios Completos'"
        ]
    },
    {
        id: 2,
        question: "La diferencia entre un programa y un proceso es…",
        options: [
            "Un proceso es estático, y no está siendo ejecutado por la CPU, y un programa es solo datos",
            "Un proceso es dinámico",
            "Ninguna es correcta",
            "Las dos son correctas"
        ],
        correct: 1,
        explanation: "Un proceso es una entidad dinámica, activa, representa la EJECUCIÓN del programa. Tiene variables, contador de Programa, registros, y otros recursos.",
        wrongExplanations: [
            "El proceso no es estático, y un programa es un conjunto de datos e instrucciones almacenados de forma pasiva. Es el programa la parte estática."
        ]
    },
    {
        id: 3,
        question: "Un proceso pasa de ejecución a listo cuando:",
        options: [
            "La entrada por la que esperaba está disponible",
            "El planificador lo selecciona",
            "El planificador selecciona otro proceso",
            "Ninguna es correcta"
        ],
        correct: 2,
        explanation: "El estado pasa de Ejecución a listo ya que el planificador decide asignar la CPU a otro proceso.",
        wrongExplanations: [
            "Esta es la transición de Estado bloqueado a libre.",
            "Esta es la transición de Estado Libre a Ejecución."
        ]
    },
    {
        id: 4,
        question: "Un hilo…",
        options: [
            "Comparte código: Datos globales, archivos abiertos con otros hilos dentro de un mismo proceso",
            "No comparte código, datos globales, archivos abiertos con otros hilos, dentro de un mismo proceso",
            "Comparte código, datos globales, archivos abiertos con hilos de otros procesos",
            "Todas las anteriores son correctas"
        ],
        correct: 0,
        explanation: "El hilo comparte sus recursos SOLAMENTE con otros hilos de un MISMO proceso pesado.",
        wrongExplanations: [
            "Falso, ya que sí comparte recursos con otros hilos dentro de un mismo proceso",
            "No comparte recursos con hilos de otros procesos"
        ]
    },
    {
        id: 5,
        question: "En caso de utilizar hilos",
        options: [
            "Los hilos dentro de un HWP no son independientes",
            "El espacio de direcciones de memoria RAM no es compartido",
            "El acceso a memoria compartida no necesita control",
            "No pueden aparecer condiciones de carrera"
        ],
        correct: 0,
        explanation: "Los hilos dentro de un proceso comparten el mismo espacio de direcciones de memoria, archivos abiertos, y otros recursos.",
        wrongExplanations: [
            "Los hilos de un proceso comparten exactamente el mismo espacio de direcciones de memoria",
            "El acceso concurrente a memoria compartida necesita mecanismos de sincronización para evitar problemas de consistencia. Ej: Como un mutex.",
            "Son un riesgo inherente cuando múltiples hilos acceden a datos compartidos sin sincronización."
        ]
    },
    {
        id: 6,
        question: "Cuando se realiza un cambio de contexto a raíz de una interrupción",
        options: [
            "Se almacena el psw y el pc del programa en ejecución en una pila",
            "El programa en ejecución pasa a la cola de listos",
            "Se deshabilita el bus",
            "Todas las opciones anteriores son correctas"
        ],
        correct: 0,
        explanation: "El hardware guarda automáticamente el PSW (Program Status Word) y el PC (Program Counter) del proceso en ejecución en una pila del kernel. Esto permite conservar el estado del proceso para restaurarlo posteriormente cuando se reanude su ejecución. Tanenbaum enfatiza que este paso es crítico para la gestión de procesos, ya que garantiza que el sistema operativo pueda interrumpir y reanudar procesos de manera transparente.",
        wrongExplanations: [
            "No siempre es cierto. El proceso en ejecución puede pasar a la cola de listos si fue desalojado por el planificador (ej. por expiración de su quantum), pero si la interrupción causa que el proceso se bloquee (ej. esperando una operación de E/S), pasará a la cola de bloqueados.",
            "Tanenbaum no menciona que el bus se deshabilite durante un cambio de contexto. En lugar de ello, el manejo de interrupciones implica deshabilitar interrupciones adicionales temporalmente en el CPU para proteger estructuras críticas del kernel, pero no se deshabilita el bus del sistema."
        ]
    },
    {
        id: 7,
        question: "Los semáforos mutex:",
        options: [
            "Deben inicializarse en cualquier valor entero no negativo",
            "Deben inicializarse en uno",
            "Deben inicializarse en cualquier valor que no sea cero",
            "No es necesario que se inicialicen",
            "Ninguna de las anteriores"
        ],
        correct: 1,
        explanation: "Los semáforos Mutex son semáforos con funcionamiento binario, creados específicamente para garantizar acceso EXCLUSIVO a una sección crítica. Deben inicializarse en 1, para indicar que el recurso está disponible inicialmente",
        wrongExplanations: [
            "Esta descripción corresponde a los semáforos de conteo generales, no a los mutex. Los mutex son binarios y solo admiten los valores 0 y 1.",
            "No se trata de cualquier valor, ya que si se inicializa con un valor superior a 1, viola su propósito binario. Debe inicializarse explícitamente en uno.",
            "No se trata de cualquier valor, ya que si se inicializa con un valor superior a 1, viola su propósito binario. Debe inicializarse explícitamente en uno."
        ]
    },
    {
        id: 8,
        question: "Una subrutina puede implementarse como hilo (proceso ligero), es decir, como un hilo de ejecución independiente del hilo de ejecución del proceso que lo invoca, o bien, como un procedimiento que se ejecuta dentro del mismo hilo del proceso que lo invoca, una diferencia entre esas dos formas de implementación es:",
        options: [
            "El proceso ligero debe tener su propio 'Registro de estado', independiente del que tiene el proceso que lo invoca, y en el otro caso no es necesario",
            "El proceso ligero debe tener su propio registro contador de programa, independiente del que tiene el proceso que lo invoca, y en el otro caso no es necesario",
            "El proceso ligero debe tener su propio 'Registro puntero de pila', independiente del que tiene el proceso que lo invoca, y en el otro caso no es necesario",
            "Las tres opciones anteriores son válidas",
            "Ninguna de las anteriores"
        ],
        correct: 3,
        explanation: "Cuando una subrutina se implementa como un hilo (Proceso ligero) independiente, cada hilo debe tener su propio contexto de ejecución privado, es decir, cada uno de los siguientes registros de forma INDEPENDIENTE: Un Registro de estado (PSW), Un Registro Contador de Programa (PC): Para llevar el control de la instrucción actual que ejecuta cada hilo, Un Registro puntero de pila",
        wrongExplanations: []
    },
    {
        id: 9,
        question: "Uno de los mecanismos de exclusión mutua entre regiones críticas es la desactivación de interrupciones. ¿Cuál de las siguientes afirmaciones es correcta?",
        options: [
            "La exclusión es segura aunque haya múltiples procesadores ejecutando procesos en paralelo",
            "La exclusión se asegura porque se desactivan las interrupciones internas, por lo que no podrá ejecutarse otro proceso",
            "La exclusión se asegura porque el planificador le da prioridad alta al proceso que entra en su región crítica",
            "Las tres anteriores son válidas",
            "Ninguna de las anteriores"
        ],
        correct: 4,
        explanation: "Desactivar interrupciones solo es efectivo en sistemas MONOPROCESADOR, al desactivar interrupciones, el sistema busca evitar ser interrumpido por el planificador, garantizando que ningún otro proceso se ejecute por el planificador.",
        wrongExplanations: [
            "Tanenbaum enfatiza que la desactivación de interrupciones NO FUNCIONA en sistemas de múltiples CPUs.",
            "No existe una división entre interrupciones internas u externas.",
            "La desactivación de interrupciones no involucra al planificador ni se basa en prioridades. Es un mecanismo de bajo nivel donde el proceso mismo desactiva las interrupciones de Hardware."
        ]
    },
    {
        id: 10,
        question: "Cuando desde un proceso de usuario se ejecuta una llamada al sistema, implica que el SO:",
        options: [
            "Ejecute el planificador de procesos para darle prioridad a la ejecución del servicio del SO",
            "Ejecute el planificador de procesos para establecer cuál es el próximo proceso a ejecutarse",
            "Ejecute el planificador de procesos para cambiar a estado de bloqueado al resto de los procesos",
            "En este caso el SO no ejecuta el planificador de Procesos",
            "Ninguna de las anteriores"
        ],
        correct: 4,
        explanation: "Cuando un proceso de usuario ejecuta una llamada al sistema, se produce un cambio de modo de usuario a modo Kernel, donde el SO ejecuta el código correspondiente al servicio solicitado. Sin embargo, esto no implica necesariamente que el planificador de procesos se ejecute automáticamente. La ejecución del planificador depende de eventos específicos (como un bloqueo o una interrupción de reloj), no de la llamada al sistema en sí.",
        wrongExplanations: [
            "El SO no ejecuta el planificador para priorizar su propio servicio. La llamada al sistema se ejecuta en el contexto del proceso que la invoca y la priorización se maneja mediante mecanismos de planificación INDEPENDIENTES.",
            "La llamada al sistema no desencadena automáticamente el planificador. Este se ejecuta si la llamada al sistema causa un cambio de estado en el proceso.",
            "Una llamada al sistema no bloquea todos los procesos del sistema. Solo el proceso que invoca la llamada puede bloquearse si espera un recurso pero no afecta al resto de forma general.",
            "Aunque no es una consecuencia directa, el planificador se ejecuta si la llamada al sistema resulta en el bloqueo del proceso o en otro evento planificable."
        ]
    },
    {
        id: 11,
        question: "¿Cuál de las siguientes afirmaciones puede llevar a que un proceso A pase a estado de 'Listo'?",
        options: [
            "Cuando otro proceso B incrementa un semáforo binario, que el proceso A era el único que había efectuado un down sobre el mismo semáforo cuando estaba en cero",
            "Cuando el planificador detecta que ha expirado su tiempo de ejecución",
            "Cuando un servicio de interrupción haya completado la lectura de un dispositivo (como el teclado), siendo que el proceso A se bloqueó en espera de esa lectura",
            "Todas las anteriores son válidas",
            "Ninguna de las anteriores"
        ],
        correct: 3,
        explanation: "Todas las opciones son válidas: 1) Se libera un proceso bloqueado en el semáforo, cambiando a estado de listo. 2) El planificador detecta que su quantum de tiempo ha expirado. Esto causa que A pase de 'Ejecución' a 'Listo'. 3) Cuando se completa la operación de E/S por una rutina de interrupción, y el proceso A estaba bloqueado esperando ese evento, este se despierta y pasa a Listo",
        wrongExplanations: []
    },
    {
        id: 12,
        question: "Una forma de evitar el uso de tiempo ocioso de CPU, en un algoritmo de exclusión mutua es:",
        options: [
            "Utilizando una instrucción TSL, que cierre el bus de acceso a la memoria",
            "Desactivando interrupciones",
            "Implementando una variable 'Interés', que los procesos la activan para evitar la espera ocupada",
            "Las tres anteriores son válidas",
            "Ninguna de las anteriores"
        ],
        correct: 4,
        explanation: "La solución para evitar completamente la espera ocupada implica el uso de semáforos con bloqueo. El proceso se bloquea y despierta mediante llamadas al sistema.",
        wrongExplanations: [
            "La instrucción TSL utiliza espera ocupada, garantizando la exclusión mutua, pero que sí permite el tiempo de espera excesivo de cola de procesos.",
            "Este método deshabilita el planificador, haciendo que incluso empeore el tiempo ocioso de CPU.",
            "Relacionando con el algoritmo de Peterson, que usa este tipo de variables, si bien logra reducir la espera ocupada en ciertos escenarios, no la elimina completamente, ya que algunos bucles pueden seguir necesitando verificación activa."
        ]
    },
    {
        id: 13,
        question: "La alternancia Estricta requiere que:",
        options: [
            "Un proceso no entre en su región crítica hasta que el valor de 'turn' se lo permita",
            "Dos procesos se alternen a través de una espera ocupada",
            "Dos procesos se alternen estrictamente luego de entrar a sus regiones críticas",
            "Las tres anteriores son válidas",
            "Ninguna es válida"
        ],
        correct: 3,
        explanation: "Todas las opciones son correctas: 1) Cada proceso verifica repetidamente la variable 'turn' en un bucle y solo entra a su región crítica cuando 'turn' coincide con su identificador. 2) El algoritmo utiliza una espera ocupada, donde los procesos consumen ciclos de CPU mientras esperan que 'turn' cambie de valor. 3) Después de que un proceso sale de su región crítica, actualiza 'turn' para asignar el turno al otro proceso.",
        wrongExplanations: []
    },
    {
        id: 14,
        question: "La planificación por prioridad dinámica se calcula utilizando 1/n, donde n es:",
        options: [
            "La cantidad de veces que cada proceso usó el procesador",
            "La cantidad de procesos que están en memoria",
            "La cantidad de tiempo de procesador que el proceso utilizó la última vez",
            "Las tres anteriores pueden ser válidas",
            "Ninguna de las anteriores"
        ],
        correct: 2,
        explanation: "Se describe que la prioridad de un proceso puede calcularse utilizando la fórmula 1/n, donde n representa el tiempo de CPU que el proceso ha utilizado recientemente (Es decir, la cantidad de tiempo de procesador que el proceso utilizó en su última ejecución o en un período reciente). Mientras más n procesos tengamos, menor 1/n tiempo de CPU tendrán.",
        wrongExplanations: [
            "La planificación se basa en tiempo de uso REAL, no en conteos de ejecuciones, ya que el tiempo de CPU es mejor indicador del consumo de recursos.",
            "El número de procesos en memoria no se utiliza para calcular la prioridad Dinámica en los algoritmos."
        ]
    },
    {
        id: 15,
        question: "Una ventaja de los mecanismos de Exclusión mutua sin espera ocupada es que:",
        options: [
            "El S.O. bloquea al planificador, para impedir que un proceso entre en la región crítica",
            "El S.O. bloquea las interrupciones para impedir que un proceso entre en su región crítica",
            "El S.O bloquea al proceso que intenta entrar en la región crítica, porque entró otro antes",
            "Las tres anteriores son correctas",
            "Ninguna es correcta"
        ],
        correct: 2,
        explanation: "Cuando un proceso intenta entrar a una región crítica que está siendo utilizada por otro proceso, el sistema operativo lo bloquea (lo pone en estado de suspensión) y lo saca de la CPU, permitiendo que otros procesos útiles se ejecuten. Esto contrasta con la espera ocupada (busy waiting), donde el proceso consume activamente ciclos de CPU verificando repetidamente si puede entrar.",
        wrongExplanations: [
            "Bloquear al planificador paralizaría todo el sistema, impidiendo la multitarea. Tanenbaum no menciona esto como un mecanismo de exclusión mutua",
            "Bloquear interrupciones es una técnica de bajo nivel para regiones críticas muy cortas, pero no es una ventaja de los mecanismos sin espera ocupada, al contrario, la termina causando."
        ]
    },
    {
        id: 16,
        question: "El mecanismo de Exclusión Mutua con semáforos, debe implementarse con acciones atómicas, considerando el ejemplo del libro donde se aplican semáforos (Vacías, llenas, Mutex) para resolver el problema del productor-consumidor de un buffer compartido, ¿cuál de las siguientes afirmaciones es cierta?",
        options: [
            "La acción atómica se aplica cuando se ingresa un elemento en el buffer",
            "La acción atómica se aplica cuando se modifica cualquiera de los semáforos",
            "La acción atómica se aplica cuando se extrae un elemento del buffer",
            "Todas las anteriores son correctas",
            "Ninguna de las anteriores"
        ],
        correct: 1,
        explanation: "Las operaciones atómicas DOWN y UP se aplican sobre los semáforos, y sirven para incrementar o decrementar su valor. En el ejemplo del problema productor-consumidor con semáforos (vacías, llenas, mutex), la atomicidad es crucial en las operaciones de estos semáforos, ya que garantizan la sincronización correcta entre procesos sin conflictos.",
        wrongExplanations: [
            "La inserción de un elemento en el buffer ocurre dentro de la región crítica protegida por el semáforo mutex, la atomicidad no se aplica directamente en esta acción.",
            "Incorrecta por la misma razón que la opción A. La extracción del buffer está protegida por mutex, pero la atomicidad crítica reside en las operaciones de los semáforos (down y up), no en la extracción misma."
        ]
    },
    // Preguntas Verdadero/Falso
    {
        id: 17,
        question: "Para muchas aplicaciones, un proceso necesita acceso exclusivo no solo a un recurso, sino a varios",
        options: [
            "Verdadero",
            "Falso"
        ],
        correct: 0,
        explanation: "Verdadero: En varias aplicaciones, como por ejemplo, el problema de Los Filósofos Comilones, o procesos que gestionan múltiples dispositivos, un proceso requiere acceder a más de un recurso en ejecución para realizar su tarea.",
        wrongExplanations: []
    },
    {
        id: 18,
        question: "Un recurso apropiativo es uno que se puede quitar al proceso que lo posee sin efectos dañinos",
        options: [
            "Verdadero",
            "Falso"
        ],
        correct: 0,
        explanation: "Verdadero: Los recursos apropiativos pueden interferirse sin causar daños o perjudicar. En contraste, los algoritmos no apropiativos, son aquellos a los que quitarle el proceso puede resultar destructivo.",
        wrongExplanations: []
    },
    {
        id: 19,
        question: "Condición de exclusión mutua es cuando cada recurso se asigna en un momento dado solo a un proceso, o está disponible",
        options: [
            "Verdadero",
            "Falso"
        ],
        correct: 0,
        explanation: "Verdadero, es la definición de exclusión mutua, una de las 4 condiciones para que ocurra un interbloqueo.",
        wrongExplanations: []
    }
];

// Configuración del quiz
const quizConfig = {
    passingScore: 60,
    pointsPerQuestion: Math.ceil(100 / quizData.length), // Distribuir 100 puntos entre todas las preguntas
    totalQuestions: quizData.length
};