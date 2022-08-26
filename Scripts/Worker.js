self.onmessage = function (event)
{
    let max = event.data;
    let gestrichen = [];
    let i = 2;

    while(i <= max)
    {
        if (gestrichen.indexOf(i) > -1)
        {
            self.postMessage("n," + i);
        }
        else
        {
            self.postMessage("y," + i);
            let check = i;
            while (check < max)
            {
                check += i;
                gestrichen.push(check);
            }
        }
        i++;
    }
}