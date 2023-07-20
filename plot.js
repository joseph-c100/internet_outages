import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function fetchDataAndPlot() {
try {
    // Fetch JSON data for last week
    const jsonDataURL7days = "https://internetshutdowns.joeclark176.workers.dev/";
    const jsonData7days = await d3.json(jsonDataURL7days, d3.autoType);

    // Fetch JSON data for last 3 months
    const jsonDataURL3months = "https://internetshutdowns3months.joeclark176.workers.dev/";
    const jsonData3months = await d3.json(jsonDataURL3months, d3.autoType)


    // Last week timeline
    // Convert startDate and endDate to Date objects
    jsonData7days.result.annotations.forEach((annotation) => {
        annotation.startDate = new Date(annotation.startDate);
        if (annotation.endDate) {
        annotation.endDate = new Date(annotation.endDate);
    }
    });

    // new current date if the outage is ongoing
    const currentDate = new Date()
    const colours = ["#505050", "#FB765A"]

    // Extracting start and end dates for the line chart
    const dataForLineChart = jsonData7days.result.annotations.map((annotation) => ({
        startDate: annotation.startDate,
        endDate:annotation.endDate || currentDate,
        OutageCause: annotation.outage.outageCause,
        Country: annotation.locationsDetails[0].name,
    }));

    // Create the line chart
    const linePlot = Plot.plot({
        color: {legend: true, range: colours},
        height:400,
        width:1000,
        marginLeft: 80,
        marginBottom:50,
        inset: 20,
        style: {fontSize: 12},
        x: {
            axis: "bottom",
            grid: true,
        },
        y: {
            grid: true,
        },
        marks: [
            Plot.barX(dataForLineChart, { x1: "startDate", x2:"endDate", y: "Country", fill:"OutageCause"}),
            Plot.frame({stroke:"red"}),
        ],
        });


    const dataForCauseBarChart = jsonData3months.result.annotations.map((annotation) => ({
        OutageCause: annotation.outage.outageCause,
        Country: annotation.locationsDetails[0].name,
    }));

    // Create dot chart for last 3 months
    const causeBarChart = Plot.plot({
        color: { legend: false },
        width: 1000,
        height: 400,
        insetLeft: 20,
        marginLeft: 40,
        marginBottom: 40,
        insetBottom: 5,
        marginBottom: 110,
        marks: [
            Plot.gridY({
                strokeDasharray: "0.75,2", // dashed
                strokeOpacity: 1 // opaque
            }),
            Plot.barY(
                dataForCauseBarChart,
                Plot.groupX(
                    { y: "count" },
                    { x: "OutageCause"},
                ),
            ),
            Plot.axisX({anchor: "bottom", label: null, tickRotate: -45}),
            Plot.ruleY([0])
            ]
    })


    // append plots to their div
    const outageTimelineDiv = document.querySelector("#outageTimeline");
    outageTimelineDiv.append(linePlot);


    const outageCauseDiv = document.querySelector("#outagesCauses");
    outageCauseDiv.append(causeBarChart);


} catch (error) {
    console.error("Error fetching JSON:", error);
}
}

fetchDataAndPlot();
