from cloudant.design_document import DesignDocument

# How to
# https://python-cloudant.readthedocs.io/en/stable/design_document.html#


def read_only_except_admin(database, database_name: str):
    """
    A variation of this

    https://gist.github.com/ThibaultJanBeyer/389bca37f4b6973b84908895300bb7de
    """
    try:
        design_doc = DesignDocument(database=database, document_id="_design/auth")

        design_doc[
            "validate_doc_update"
        ] = "function(newDoc, oldDoc, userCtx, secObj) { if (userCtx.roles.indexOf('admin') !== -1 || userCtx.name==='admin') { return; } else { throw ({ forbidden: 'Only admins may edit this database' }); } }"
        design_doc.save()
    except:
        print(f"A design document for {database_name} already exists.")
