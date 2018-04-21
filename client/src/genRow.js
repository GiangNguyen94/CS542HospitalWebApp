import React from 'react';

export function searchVal(s, data, key){

  let keylength = key.length;

  if(s !== ''){

    for(let j = 0; j < keylength; j++){


      var tempData = String(data[key[j]]);

        tempData = tempData.toLowerCase();

      if(tempData == s.toLowerCase()){
        return 1;
      }

    }
  }

  return 0;

}



export default function generateRow(product, key, searchValue, modCond, deleteCond, handleSubmitModify, handleSubmitDelete,doneCondition){


  let row = [];
  let searchIndex = [];

  var datalength = product.length;

  for (var i = 0; i < datalength; i++){


    if(searchValue != ''){

      var checkCond = searchVal(searchValue, product[i] , key);

      if(checkCond == 0){

        continue;
      } else {
searchIndex.push(i);
        console.log("searchIndex", searchIndex);
      }

    }


    let temp = [];
    for(let j = 0; j < key.length; j++){


      if(modCond != -1 && modCond == i){


        temp.push(<td contenteditable={'true'}>{product[i][key[j]]}</td>);

      }else{
        temp.push(<td contenteditable={'false'}>{product[i][key[j]]}</td>);

      }



    }






    if((modCond != -1 && modCond == i) || (deleteCond != -1 && deleteCond == i)){



      if(modCond != -1 && modCond == i){


        temp.push(<td><div contenteditable={'false'}><a href="#" onClick = {handleSubmitModify.bind(this,i,1)}>Done?</a></div></td>);




        temp.push(<td><div contenteditable={'false'}><a href="#" onClick = {handleSubmitDelete.bind(this, i)}>Delete</a></div></td>);


      } else {

        temp.push(<td><div contenteditable={'false'}><a href="#" onClick = {handleSubmitModify.bind(this,i,0)}>Modify</a></div></td>);
        temp.push(<td><div contenteditable={'false'}><a href="#" onClick = {handleSubmitDelete.bind(this, i)}>Delete</a></div></td>);


      }

      row.push(
        <tr  class='highlightColor'>
        {temp}
        </tr>

      );

    }else{

      temp.push(<td><div contenteditable={'false'}><a href="#" onClick = {handleSubmitModify.bind(this,i)}>Modify</a></div></td>);
      temp.push(<td><div contenteditable={'false'}><a href="#" onClick = {handleSubmitDelete.bind(this, i)}>Delete</a></div></td>);


      row.push(
        <tr  class='tr-hover-class'>
        {temp}
        </tr>

      );


    }




  }

  if(datalength < 10){

    for(let i = 0; i < 10 - datalength; i++){
      let temp = [];
      for(let j = 0; j < key.length; j++){
        temp.push(<td><div contenteditable={'false'}>--</div></td>);

      }

      temp.push(<td><div contenteditable={'false'}>--</div></td>);
      temp.push(<td><div contenteditable={'false'}>--</div></td>);

      row.push(
        <tr  class='tr-hover-class'>
        {temp}
        </tr>
      );
    }
  }

  return {row, searchIndex};

}
