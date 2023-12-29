import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// function to populate 7 days table
async function fetchData() {
    try {
        // Fetch JSON data from the provided link
        const jsonData7days = await d3.json('https://internetshutdowns.joeclark176.workers.dev/', d3.autoType);
        const jsonData3months = await d3.json('https://internetshutdowns3months.joeclark176.workers.dev/', d3.autoType);

        const currentDate = new Date();

        // Define column headers for both tables
        const columnHeaders = ['Country', 'Start Date', 'End Date', 'Outage Cause', 'Scope', 'Description', 'ASN'];

        // Create a table header for 7 days table
        const tableHeader7days = d3.select('#outageTableWeek')
            .append('thead')
            .append('tr')
            .selectAll('th')
            .data(columnHeaders)
            .enter()
            .append('th')
            .text(d => d);

        // map data for 7 days table
        const dataForTable7days = jsonData7days.result.annotations.map((annotation) => ({
            startDate: annotation.startDate,
            endDate: annotation.endDate || currentDate,
            OutageCause: annotation.outage.outageCause,
            Country: annotation.locationsDetails[0].name,
            Scope: annotation.scope,
            description: annotation.description,
            asns: annotation.asns
        }));

        // Create table rows with the data
        const rows7days = d3.select('#outageTableWeek')
            .selectAll('tr.row7days')
            .data(dataForTable7days)
            .enter()
            .append('tr')
            .attr('class', 'row7days');

        // Create table cells and populate with data
        rows7days.append('td').text(d => d.Country);
        rows7days.append('td').text(d => d.startDate);
        rows7days.append('td').text(d => (d.endDate !== currentDate ? d.endDate : 'null (Possibly ongoing)'));
        rows7days.append('td').text(d => d.OutageCause);
        rows7days.append('td').text(d => d.Scope);
        rows7days.append('td').text(d => d.description);

        // Append the ASN names using <span> tags
        rows7days.append('td')
            .attr('class', 'asn-cell')
            .selectAll('span')
            .data(d => (d.asns ? d.asns : []))
            .enter()
            .append('span')
            .text(d => d);

        // Create a table header for 3 months table
        const tableHeader3months = d3.select('#outageTableMonths')
            .append('thead')
            .append('tr')
            .selectAll('th')
            .data(columnHeaders)
            .enter()
            .append('th')
            .text(d => d);

        // map data for 3 months table
        const dataForTable3months = jsonData3months.result.annotations.map((annotation) => ({
            startDate: annotation.startDate,
            endDate: annotation.endDate || currentDate,
            OutageCause: annotation.outage.outageCause,
            Country: annotation.locationsDetails[0].name,
            Scope: annotation.scope,
            description: annotation.description,
            asns: annotation.asns
        }));

        // Create table rows with the data
        const rows3months = d3.select('#outageTableMonths')
            .selectAll('tr.row3months')
            .data(dataForTable3months)
            .enter()
            .append('tr')
            .attr('class', 'row3months');

        // Create table cells and populate with data
        rows3months.append('td').text(d => d.Country);
        rows3months.append('td').text(d => d.startDate);
        rows3months.append('td').text(d => (d.endDate !== currentDate ? d.endDate : 'null (Possibly ongoing)'));
        rows3months.append('td').text(d => d.OutageCause);
        rows3months.append('td').text(d => d.Scope);
        rows3months.append('td').text(d => d.description);

        // Append the ASN names using <span> tags
        rows3months.append('td')
            .attr('class', 'asn-cell')
            .selectAll('span')
            .data(d => (d.asns ? d.asns : []))
            .enter()
            .append('span')
            .text(d => d);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
