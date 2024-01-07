window.onload = async () => {

    let query = new URLSearchParams(location.search)

    const id = query.has('movie') && query.get('movie')
    const form = document.querySelector('form')

    try {
        const response = await fetch(`http://localhost:3031/api/movies/${id}`);
        const { data: { title, awards, rating, release_date, length } } = await response.json();

        form.elements[1].value = title;
        form.elements[2].value = rating;
        form.elements[3].value = awards;
        form.elements[4].value = release_date.split('T')[0];
        form.elements[5].value = length;

    } catch (error) {
        console.log(error)
    }

    document.getElementById('btn-add').addEventListener('click', () => {
      form.reset();
      query.set('edit',false)
      form.elements[1].focus();
    })

    form.addEventListener('submit', async function (event) {
        event.preventDefault()
        const URLBase = `http://localhost:3031/api/movies/`;
        const url = query.get('edit') === "true" ? `${URLBase}update/${id}` : `${URLBase}create/`

        try {
            const response = await fetch(url, {
                method: query.get('edit') === "true" ? "PUT" : "POST",
                body: JSON.stringify({
                    title: this.elements[1].value,
                    rating: this.elements[2].value,
                    awards: this.elements[3].value,
                    release_date: this.elements[4].value,
                    length: this.elements[5].value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.meta.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: query.get('edit') === "true" ? "Película actualizada" : "Película agregada",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (result.meta.status === 204) {
                Swal.fire({
                    position: "top-end",
                    icon: "info",
                    title: "No se hicieron cambios",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "danger",
                    title: "Upss, hubo un error al actualizar",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.log(error)
        }

    })

}


