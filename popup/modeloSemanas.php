<?php  
require_once "modelo.php"; 

class semanasModelo extends Modelo 
{     
    public function __construct() 
    { 
        parent::__construct(); 
    } 

    public function get_semanas() 
    { 
        $result = $this->_db->query('SELECT cultivo, fecha_trans, id, rancho, sector, tabla, WEEK( fecha_trans, 1 ) AS Semana
FROM  conf_rancho
order by Semana'); 
         
        $sem = $result->fetch_all(MYSQLI_ASSOC); 
         
        return $sem; 
    } 
    
    public function get_cantidadReg($semana) 
    { 
        $result = $this->_db->query('SELECT COUNT(*) FROM conf_rancho where id = '.$semana.';'); 
         
        $sem = $result->fetch_all(MYSQLI_ASSOC); 
         
        return $sem; 
    } 
    
    function dias_transcurridos($fecha_i,$fecha_f)
	{
		$dias	= (strtotime($fecha_i)-strtotime($fecha_f))/86400;
		$dias 	= abs($dias); $dias = floor($dias);		
		if($dias>1)
		{
			$d = $dias." días";
		}else
		{
			$d = $dias." día";
		}
		return $d;
	}
} 
  ?> 