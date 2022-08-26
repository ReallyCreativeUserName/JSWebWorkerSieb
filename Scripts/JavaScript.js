"use strict";

let worker;
let tdlist = [];

window.onload = function ()
{
    worker = new Worker("Scripts/Worker.js");

    tdlist = document.getElementsByClassName("wert");

    anzahl.onchange = function ()
    {
        CreateTable();
        document.getElementById("anzahllabel").innerText = document.getElementById("anzahl").value;
        WorkerWorks();
    }
}

function WorkerWorks()
{
    worker.onmessage = function(event)
    {
        let data = event.data;
        let wertung = data.split(',');

        if (wertung[0] == "y")
        {
            document.getElementById("td" + wertung[1]).setAttribute("style", "background-color:green;");

            let li = document.createElement("li");
            li.innerText = wertung[1];
            document.getElementById("list").appendChild(li);
        }
        else
        {
            document.getElementById("td" + wertung[1]).setAttribute("style", "background-color:red;");
        }
    }
}
function CreateTable()
{
    document.getElementById("list").innerHTML = "";

    let anzahl = document.getElementById("anzahl").value;
    let html = "<table><tr><td></td>";

    for (let i = 2; i <= anzahl; i++)
    {
        html += "<td id='td" + i + "' class=\"wert\">" + i + "</td>";

        if (i % 10 == 0)
        {
            html += "</tr><tr>";
        }
    }

    html += "</tr></table>";

    document.getElementById("output").innerHTML = html;

    worker.postMessage(anzahl);
}