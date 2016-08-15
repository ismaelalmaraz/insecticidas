<?php  
/*require_once "config.php"; 

class Modelo 
{ 
    protected $_db; 

    public function __construct() 
    { 
        $this->_db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME); 

        if ( $this->_db->connect_errno ) 
        { 
            echo "Fallo al conectar a MySQL: ". $this->_db->connect_error; 
            return;     
        } 

        $this->_db->set_charset(DB_CHARSET); 
    } 
} */
?> 

<?php 

class Database 
{ 
    public $db;   // handle of the db connexion    
    private static $dns = "\"sqlsrv:server = tcp:s08pa628wq.database.windows.net,1433; Database = grupou_db\", \"grupou\", \"{123456789Oo.}\"";
    
    //private static $dns ="'mysql:host=localhost;dbname=prueba', $usuario, $contraseña"
    private static $user = "user"; 
    private static $pass = "password";     
    private static $instance;

    public function __construct ()  
    {        
       $this->db = new PDO(self::$dns,self::$user,self::$pass);       
    } 

    public static function getInstance()
    { 
        if(!isset(self::$instance)) 
        { 
            $object= __CLASS__; 
            self::$instance=new $object; 
        } 
        return self::$instance; 
    }    
} 

?> 