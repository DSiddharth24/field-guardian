
/**
 * Utility to generate and download dummy report data.
 */
export function downloadReport(title: string, type: string) {
    console.log(`Generating report: ${title} (${type})`);

    // Generate dummy data based on type
    let csvContent = "data:text/csv;charset=utf-8,";

    if (type === 'Compliance') {
        csvContent += "Date,Checklist Item,Status,Comments\n";
        csvContent += "2026-03-01,Safety Equipment Check,Compliant,All harnesses inspected\n";
        csvContent += "2026-03-02,Sanitation Audit,Compliant,Toilet blocks cleaned\n";
        csvContent += "2026-03-03,Wages Distribution,Compliant,All workers paid as per minimum wage\n";
    } else if (type === 'Grievance') {
        csvContent += "ID,Date,Category,Status,Resolution\n";
        csvContent += "GRV-001,2026-02-15,Pay,Resolved,Miscalculation corrected\n";
        csvContent += "GRV-002,2026-02-20,Safety,In Progress,New boots ordered\n";
        csvContent += "GRV-003,2026-03-01,Facilities,Resolved,Water filter replaced\n";
    } else if (type === 'Migrant') {
        csvContent += "Worker ID,Name,State of Origin,Passbook Issued,Allowance Status\n";
        csvContent += "FG-W-56291,Gowramma,Karnataka,Yes,Paid\n";
        csvContent += "FG-W-56292,Ramesh,Odisha,Yes,Pending\n";
        csvContent += "FG-W-56293,Sunita,Bihar,Yes,Paid\n";
    } else if (type === 'Safety') {
        csvContent += "Plot ID,Injury Type,Severity,Date,Action Taken\n";
        csvContent += "Plot 12,Cut/Blade,Minor,2026-02-10,First aid administered\n";
        csvContent += "Plot 15,Fall,Moderate,2026-02-12,Sent to estate clinic\n";
        csvContent += "Plot 08,Machinery,Minor,2026-02-18,Equipment serviced\n";
    } else if (type === 'Weighment') {
        csvContent += "Date,Worker ID,Weight (KG),Supervisor,Verification\n";
        csvContent += "2026-03-01,FG-W-56291,12.5,Arun K.,Blockchain Verified\n";
        csvContent += "2026-03-01,FG-W-56292,14.2,Arun K.,Blockchain Verified\n";
        csvContent += "2026-03-02,FG-W-56291,11.8,Arun K.,Pending Verification\n";
    } else {
        csvContent += "Title,Date,Status\n";
        csvContent += `${title},March 2026,Generated\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}
