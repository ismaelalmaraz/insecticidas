<?php   
     require_once "modeloSemanas.php"; 

    $usuarioModel = new usuariosModelo(); 
    $a_users = $usuarioModel->get_users(); 
?> 

<!DOCTYPE html> 
 <html> 
 <head> 
     <title>Usuarios registrados</title> 
 </head> 
 <body> 
     <table > 
            <tr> 
                <td> 
                    Id 
                </td> 
                <td > 
                    Nombre 
                </td> 
                <td> 
                    Correo 
                </td> 
            </tr><!-- /THEAD --> 

            <?php foreach ($a_users as $row): ?> 

            <tr> 
                <td><?php echo $row['plagaoplanta']; ?></td> 
                <td><?php echo $row['cantidadplaga']; ?></td> 
                <td><?php echo $row['estadio']; ?></td> 
            </tr><!-- /TROW --> 
         
            <?php endforeach ?>     
                  
        </table> 
    
 </body> 
 </html> 