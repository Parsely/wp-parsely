gh api --paginate /repos/parsely/wp-parsely/actions/runs | \
jq -r '.workflow_runs[] | [.id, .path ] | @tsv' | \
while read -r value; do
	  # break the first value (id) and the second value (path) into two variables
	  		id=$(echo "$value" | cut -f1)
				path=$(echo "$value" | cut -f2)
		# List of allowed paths
		allowed_paths=(".github/workflows/build-and-deploy.yml")

		# Check if the path is in the allowed paths
		if [[ "${allowed_paths[@]}" =~ "${path}" ]]; then
			echo "Deleting $id $path"
			gh api -X DELETE "/repos/parsely/wp-parsely/actions/runs/$id"
		fi

    #gh api -X DELETE "/repos/scottgriv/username/reponame/actions/runs/$value"
done
