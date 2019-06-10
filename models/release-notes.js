const axios = require('axios');

exports.getReleaseNotes = () => {
    const releaseNotesUrl = 'https://gist.githubusercontent.com/VirtuosiMedia/35ac0ff67ee2756c2a72fcb9d9c1b380/raw/3813da12102d7375383383d4b2572c748b1b8361/release-notes.md';

    return axios.get(releaseNotesUrl)
        .then(response => {
            const data = { notes: [] };

            /**
             * Note: There is a lot of validation that could occur here in terms of security and formatting.
             * For the sake of simplicity for this exercise, it is being assumed that the format is correct and safe.
             */

            // Convert the release notes from markdown to JSON. Note that more robust markdown support could be added if needed.
            let releaseNotes = response.data.split('\n');

            // Get rid of the file title.
            releaseNotes.shift();

            // Split by note.
            releaseNotes = releaseNotes.join('\n').split(/(?:^|[^#])## /);

            // Get rid of the junk index.
            releaseNotes.shift();

            //Reverse order to get the latest first. This is entirely dependent on the format of the markdown file and may not be needed.
            releaseNotes.reverse();

            // Format into JSON.
            releaseNotes.forEach(note => {
                const metadata = note.split('\n');
                data.notes.push({
                    title: metadata[0].trim(),
                    date: metadata[1].replace('###', '').trim(),
                    type: metadata[2].replace('####', '').trim(),
                    content: metadata.slice(3)
                });
            });

            return data;
        }).catch(error => {
            console.log(error);
        });
};