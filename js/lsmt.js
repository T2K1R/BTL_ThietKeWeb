function luuls()
{
    let ls = localStorage.getItem('ls') ? JSON.parse(localStorage.getItem('ls')) : [];
    let bangls = `<tr class="header">
    <th class="td1">STT</th>
    <th class="td2">Mã phiếu mượn</th>
    <th class="td3">Mã sách</th>
    <th class="td4">Mã sinh viên</th>
    <th class="td5">Ngày mượn</th>
    <th class="td6">Ngày trả</th>
    <th class="td7">SL</th>
    </tr>`;
    if(ls.length === 0)
    {
        bangls += `<tr>
        <td colspan="7" class="no-data">Không tìm thấy dữ liệu</td>
        </tr>`;
    }
    ls.forEach(function(ls,stt)
    {
        ++stt;
        bangls += `<tr>
        <td class="td1">${stt}</td>
        <td class="td2">${ls.mpm}</td>
        <td class="td3">${ls.msm}</td>  
        <td class="td4">${ls.msv}</td>
        <td class="td5">${ls.ngm}</td>
        <td class="td6">${ls.ngtr}</td>
        <td class="td7">${ls.slm}</td>
        </tr>`;
    });
    document.getElementById('lsmt').innerHTML = bangls;
}

function timkiemls()
{
    let ls = localStorage.getItem('ls') ? JSON.parse(localStorage.getItem('ls')) : [];
    if(ls.length===0)
    {
        alert("Chức năng này hiện không khả dụng do chưa có dữ liệu! Vui lòng nhập liệu trước khi sử dụng!");
    }
    else
    {
        let tk = document.getElementById('timkiemls').value;
        let kq = [];
        ls.forEach(function(ls)
        {
            if(ls.mpm.indexOf(tk)!=-1||ls.msm.indexOf(tk)!=-1||ls.msv.indexOf(tk)!=-1)
                    kq.push(ls);
        });
        let bangkq = `<tr class="header">
        <th class="td1">STT</th>
        <th class="td2b">Mã phiếu mượn</th>
        <th class="td3b">Mã sách</th>
        <th class="td4b">Mã sinh viên</th>
        <th class="td5b">Ngày mượn</th>
        <th class="td6b">Ngày trả</th>
        <th class="td7b">SL</th>
        </tr>`;
        if(kq.length===0)
        {
            bangkq += `<tr>
            <td colspan="8" class="no-data">Không tìm thấy dữ liệu</td>
            </tr>`;
        }
        else
        {
            kq.forEach(function(ls,stt)
            {
                let id = stt;
                ++stt;
                bangkq += `<tr>
                <td class="td1">${stt}</td>
                <td class="td2">${ls.mpm}</td>
                <td class="td3">${ls.msm}</td>  
                <td class="td4">${ls.msv}</td>
                <td class="td5">${ls.ngm}</td>
                <td class="td6">${ls.ngtr}</td>
                <td class="td7">${ls.slm}</td>
                </tr>`
            });
        }
        document.getElementById('lsmt').innerHTML = bangkq; 
    }
}

function txlichsu()
{
    let ls = localStorage.getItem('ls') ? JSON.parse(localStorage.getItem('ls')) : [];
    if(ls.length===0)
    {
        alert("Chức năng này hiện không khả dụng do chưa có dữ liệu! Vui lòng nhập liệu trước khi sử dụng!");
    }
    else
    {
        let tk = document.getElementById('timkiemls').value;
        let kq = [];
        ls.forEach(function(ls)
        {
            if(ls.mpm.indexOf(tk)!=-1||ls.msm.indexOf(tk)!=-1||ls.msv.indexOf(tk)!=-1)
                kq.push(ls);
        });
        if(kq.length===0)
        {
            alert("Chức năng này hiện không khả dụng do không có dữ liệu phù hợp! Vui lòng nhập và chọn lại điều kiện tìm kiếm/lọc trước khi tải file!");
        }
        else
        {
            let xuongdong = '\r\n';
            let cach = '\s';
            let noidungcsv = `\uFEFFSTT,Mã phiếu mượn,Mã sách,Mã sinh viên,Ngày mượn,Ngày trả,Số lượng${xuongdong}`;
            let tenfilecsv = `Lich su muon tra_${thoigianhientai()}.csv`;
            let sttcuoi = kq.length - 1;
            kq.forEach(function(kq,stt)
            {
                noidungcsv += `${stt + 1},${kq.mpm},${kq.msm},${kq.msv},${kq.ngm},${kq.ngtr},${kq.slm}`;
                if(stt<sttcuoi)
                {
                    noidungcsv += xuongdong;
                }
            });
            let linktaixuong = document.createElement('a');
            linktaixuong.setAttribute('href','data:application/csv,' + encodeURIComponent(noidungcsv));
            linktaixuong.setAttribute('download', tenfilecsv);
            document.body.appendChild(linktaixuong);
            linktaixuong.click();
        }
    }
}